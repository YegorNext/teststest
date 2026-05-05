import dotenv from "dotenv";

dotenv.config();

export const cloudflareConfig = {
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  baseUrl: process.env.CLOUDFLARE_API_BASE_URL!,
};