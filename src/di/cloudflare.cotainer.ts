import { CloudflareApiClient } from "../services/cloudFlare/cloudflareApiClient";
import { CloudflareZoneService } from "../services/cloudFlare/cloudflareZoneService";
import { CloudflareDNSService } from "../services/cloudFlare/cloudflareDNSService";
import { CloudflareSSLService } from "../services/cloudFlare/cloudflareSSLService";
import { DomainProvisionService } from "../services/DomainProvisioningService";
import { NamecheapDNSService } from "../services/NamecheapDNSService";
import { NamecheapHttpClient } from "../services/purchase/dns/NamecheapHttpClient";
import { NamecheapResponseParser } from "../services/purchase/dns/NamecheapResponseParser";
import { namecheapConfig } from "../config/namecheap.config";

const namecheapDNS = new NamecheapDNSService(
  new NamecheapHttpClient(namecheapConfig.apiUrl),
  new NamecheapResponseParser()
);

const apiClient = new CloudflareApiClient();

const zoneService = new CloudflareZoneService(apiClient);
const dnsService = new CloudflareDNSService(apiClient);
const sslService = new CloudflareSSLService(apiClient);

export const cloudflareProvisionService = new DomainProvisionService(
  zoneService,
  dnsService,
  sslService,
  namecheapDNS
);