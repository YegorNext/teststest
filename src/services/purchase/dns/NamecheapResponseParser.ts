import { parseStringPromise } from 'xml2js';

export class NamecheapResponseParser {
  async parseSetARecord(xml: string): Promise<boolean> {
    const parsed = await parseStringPromise(xml);

    return (
      parsed?.ApiResponse?.CommandResponse?.[0]?.DomainDNSSetHostsResult?.[0]?.$?.IsSuccess === 'true'
    );
  }

  async parseSetCustomNameservers(xml: string): Promise<boolean> {
    const parsed = await parseStringPromise(xml);

    const result = parsed?.ApiResponse?.CommandResponse?.[0]?.DomainDNSSetCustomResult?.[0]?.$;

    if (!result) {
      console.log("INVALID NAMECHEAP RESPONSE", xml);
      return false;
    }

    return result.Updated === "true";
  }
}