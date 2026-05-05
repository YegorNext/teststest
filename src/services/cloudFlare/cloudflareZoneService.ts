import { CloudflareApiClient } from "./cloudflareApiClient";
import { cloudflareConfig } from "../../config/cloudflare.config";

export interface CloudflareZoneResult {
  zoneId: string;
  nameservers: string[];
}

export class CloudflareZoneService {
  constructor(private client: CloudflareApiClient) {}

    async addDomain(domain: string): Promise<CloudflareZoneResult> {
    console.log("CF: creating zone for", domain);
    console.log(cloudflareConfig.accountId);

    const response = await this.client.post<any>("/zones", {
        name: domain,
        type: "full",
        account: {
        id: cloudflareConfig.accountId,
        },
    });

    console.log("CF: response ", response);


    return {
        zoneId: response.result.id,
        nameservers: response.result.name_servers,
    };
    }
}