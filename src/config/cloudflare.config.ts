import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../.env.') });

export const cloudflareConfig = {
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  baseUrl: process.env.CLOUDFLARE_API_BASE_URL!,
};