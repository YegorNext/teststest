import { CloudflareApiClient } from "./cloudflareApiClient";
import { cloudflareConfig } from "../../config/cloudflare.config";

export interface CloudflareZoneResult {
  zoneId: string;
  nameservers: string[];
}

export class CloudflareZoneService {
  constructor(private client: CloudflareApiClient) {}

  async addDomain(domain: string): Promise<CloudflareZoneResult> {
    const response = await this.client.post<any>("/zones", {
      name: domain,
      type: "full",
      account: {
        id: cloudflareConfig.accountId,
      },
    });

    if (!response.success) {
      throw new Error(
        response.errors?.[0]?.message || "Cloudflare zone creation failed"
      );
    }

    const result = response.result;

    return {
      zoneId: result.id,
      nameservers: result.name_servers,
    };
  }
}