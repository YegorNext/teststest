import dotenv from "dotenv";

dotenv.config();

export const cloudflareConfig = {
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  baseUrl: process.env.CLOUDFLARE_API_BASE_URL!,
};