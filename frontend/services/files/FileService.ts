import axios from "axios";
import { API_ROUTES, createApiUrl } from "@/config/api";

export class FileService {
  /**
   * Downloads a file by its ID.
   * @param id - The ID of the file to download.
   * @returns A promise that resolves to a Blob containing the file data.
   * @throws An error if the file download fails.
   */
  public static async downloadFile(id: number): Promise<Blob> {
    try {
      const url = createApiUrl(API_ROUTES.FILES.DOWNLOAD, { id });
      const response = await axios.get(url, { responseType: "blob" });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
