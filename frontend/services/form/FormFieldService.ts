import { useMemo } from "react";

// Service class for handling form field operations
export class FormFieldService {
  /**
   * Filters options based on a search term or value.
   * @param {string[]} options - The list of options to filter.
   * @param {string} [searchTerm] - The term to search for.
   * @param {string} [value] - The value to search for.
   * @returns {string[]} The filtered options.
   */
  static filterOptions(
    options: string[],
    searchTerm?: string,
    value?: string
  ): string[] {
    const searchValue = String(searchTerm || value || "").toLowerCase();
    return options.filter((option) =>
      String(option).toLowerCase().includes(searchValue)
    );
  }

  /**
   * Processes file uploads and generates preview URLs.
   * @param {FileList} files - The list of files to process.
   * @returns {{ files: File[], preview: string[] }} The processed files and their preview URLs.
   */
  static processFileUpload(files: FileList): {
    files: File[];
    preview: string[];
  } {
    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    return { files: fileArray, preview: previews };
  }

  /**
   * Memoizes the filtered options based on search term and value.
   * @param {string[]} options - The list of options to filter.
   * @param {string} searchTerm - The term to search for.
   * @param {string} value - The value to search for.
   * @returns {string[]} The memoized filtered options.
   */
  static useFilteredOptions(
    options: string[],
    searchTerm: string,
    value: string
  ) {
    return useMemo(
      () => FormFieldService.filterOptions(options, searchTerm, value),
      [options, searchTerm, value]
    );
  }

  /**
   * Cleans up preview URLs to release memory.
   * @param {string[]} previews - The list of preview URLs to clean up.
   */
  static cleanupPreviews(previews: string[]) {
    previews.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        console.warn("Error revoking URL:", e);
      }
    });
  }
}
