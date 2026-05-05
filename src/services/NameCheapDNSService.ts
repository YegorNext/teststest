import { parseStringPromise } from 'xml2js';
import { NamecheapHttpClient } from './purchase/dns/NamecheapHttpClient';
import { NamecheapRequestBuilder } from './purchase/dns/NamecheapRequestBuilder';
import { NamecheapResponseParser } from './purchase/dns/NamecheapResponseParser';

export interface SetARecordResult {
  isSuccess: boolean;
  errors: string[];
  rawXml: string;
}

export class NamecheapDNSService {
  constructor(private readonly http: NamecheapHttpClient, private readonly parser: NamecheapResponseParser) {}

  public async setARecord(domain: string, ip: string, hostName: string = '@', ttl: number = 1800): Promise<SetARecordResult> {
    try {
      const params = NamecheapRequestBuilder.buildARecord(domain, ip, hostName, ttl);

      const responseXml = await this.http.get(params);

      const isSuccess = await this.parser.parseSetARecord(responseXml);

      return {
        isSuccess,
        errors: [],
        rawXml: responseXml,
      };
    } catch (err: any) {
      return {
        isSuccess: false,
        errors: [err.message],
        rawXml: '',
      };
    }
  }

  public async setCustomNameservers(domain: string, nameservers: string[]) {
    const params = NamecheapRequestBuilder.buildSetCustomNameservers(
      domain,
      nameservers
    );

    const responseXml = await this.http.get(params);

    const parsed = await parseStringPromise(responseXml, {
      explicitArray: false,
    });

    const status = parsed?.ApiResponse?.$?.Status;

    const updated =
      parsed?.ApiResponse?.CommandResponse?.DomainDNSSetCustomResult?.$
        ?.Updated;

    const errors = parsed?.ApiResponse?.Errors;

    if (status !== "OK" || updated !== "true") {
      throw new Error(
        `Namecheap NS update failed for ${domain}. Status=${status}, Updated=${updated}, Errors=${JSON.stringify(
          errors
        )}`
      );
    }

    return {
      isSuccess: true,
      rawXml: responseXml,
    };
  }
}