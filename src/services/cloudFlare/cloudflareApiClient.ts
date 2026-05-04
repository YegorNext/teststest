import axios, { AxiosInstance } from "axios";
import { cloudflareConfig } from "../../config/cloudflare.config";
import { CloudflareApiError } from "./cloudFlareApiError";

export class CloudflareApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: cloudflareConfig.baseUrl,
      headers: {
        Authorization: `Bearer ${cloudflareConfig.apiToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const res = await this.client.get(url, { params });
      return res.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async post<T>(url: string, body: any): Promise<T> {
    try {
      const res = await this.client.post(url, body);
      return res.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

    async patch<T>(url: string, body: any): Promise<T> {
    try {
        const res = await this.client.patch(url, body);
        return res.data;
    } catch (error: any) {
        this.handleError(error);
    }
    }

  private handleError(error: any): never {
    const status = error?.response?.status;

    const data = error?.response?.data;

    const message =
      data?.errors?.[0]?.message ||
      data?.error ||
      error.message ||
      "Cloudflare API error";

    throw new CloudflareApiError(message, status, data);
  }
}