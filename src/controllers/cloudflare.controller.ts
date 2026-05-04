import { Request, Response } from "express";
import { cloudflareProvisionService } from "../di/cloudflare.cotainer";

export class CloudflareController {
  provisionDomain = async (req: Request, res: Response) => {
    const { domain, ip } = req.body;

    if (!domain || !ip) {
      return res.status(400).json({
        message: "Domain and IP are required",
      });
    }

    try {
      const result = await cloudflareProvisionService.provision(domain, ip);

      return res.json({
        success: true,
        provider: "cloudflare",
        result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
        details: error.details,
      });
    }
  };
}