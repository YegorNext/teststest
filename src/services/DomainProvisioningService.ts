import { CloudflareZoneService } from "./cloudFlare/cloudflareZoneService";
import { CloudflareDNSService } from "./cloudFlare/cloudflareDNSService";
import { CloudflareSSLService } from "./cloudFlare/cloudflareSSLService";
import { NamecheapDNSService } from "./NameCheapDNSService";

export class DomainProvisionService {
  constructor(
    private zoneService: CloudflareZoneService,
    private dnsService: CloudflareDNSService,
    private sslService: CloudflareSSLService,
    private namecheapDNS: NamecheapDNSService   // 👈 NEW
  ) {}

  async provision(domain: string, ip: string) {
    const zone = await this.zoneService.addDomain(domain);

    await this.namecheapDNS.setCustomNameservers(
      domain,
      zone.nameservers
    );

    const root = await this.dnsService.createARecord(
      zone.zoneId,
      "@",
      ip
    );

    const www = await this.dnsService.createCNAMERecord(
      zone.zoneId,
      "www",
      domain
    );

    await this.sslService.enableHttps(zone.zoneId);

    return {
      domain,
      zoneId: zone.zoneId,
      nameservers: zone.nameservers,
      dns: {
        root,
        www,
      },
      https: true,
    };
  }
}