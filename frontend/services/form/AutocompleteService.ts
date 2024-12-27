import { API_ROUTES, createApiUrl } from "@/config/api";
import { AutocompleteData, StudentData } from "@/types/Form";
import axios from "axios";

// Service class for handling autocomplete data
export class AutocompleteService {
  // Cache key for storing autocomplete data
  private static CACHE_KEY = "autocompleteData";
  // Cache key for storing the timestamp of when the data was cached
  private static CACHE_TIMESTAMP_KEY = "autocompleteDataTimestamp";
  // Duration for which the cache is valid (24 hours)
  private static CACHE_DURATION = 24 * 60 * 60 * 1000;
  // Add new cache key for student data
  private static STUDENTS_CACHE_KEY = "studentsData";

  /**
   * Fetches autocomplete data from the server or cache.
   * @returns {Promise<AutocompleteData>} The autocomplete data.
   */
  static async fetchData(): Promise<AutocompleteData> {
    // Try to load data from cache
    const cached = this.loadFromCache();
    if (cached) return cached;

    // Fetch autocomplete data
    const [fieldsResponse, studentsResponse] = await Promise.all([
      axios.get<AutocompleteData>(createApiUrl(API_ROUTES.FIELDS.EDIT)),
      axios.get<StudentData>(createApiUrl(API_ROUTES.STUDENTS.LIST)),
    ]);

    // Save student data in separate cache
    this.saveStudentsToCache(studentsResponse.data);

    // Extract student names and create the nombreEstudiante field
    const studentNames = Object.keys(studentsResponse.data);
    const mergedData: AutocompleteData = {
      ...fieldsResponse.data,
      nombreEstudiante: {
        default: "",
        opciones: studentNames,
      },
    };

    // Save the merged data to cache
    this.saveToCache(mergedData);
    return mergedData;
  }

  /**
   * Gets student data by name
   * @param {string} name - Student's name
   * @returns {StudentData[string] | null} Student data if found
   */
  static getStudentByName(name: string): StudentData[string] | null {
    const studentsData = localStorage.getItem(this.STUDENTS_CACHE_KEY);
    if (!studentsData) return null;

    const students = JSON.parse(studentsData) as StudentData;
    return students[name] || null;
  }

  /**
   * Forces a fresh fetch of data by clearing cache and fetching again
   * @returns {Promise<AutocompleteData>} Fresh autocomplete data
   */
  static async refetchData(): Promise<AutocompleteData> {
    this.clearCache();
    return this.fetchData();
  }

  /**
   * Saves autocomplete data to local storage cache.
   * @param {AutocompleteData} data - The data to be cached.
   */
  private static saveToCache(data: AutocompleteData): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
  }

  /**
   * Loads autocomplete data from local storage cache.
   * @returns {AutocompleteData | null} The cached data or null if cache is expired or not found.
   */
  private static loadFromCache(): AutocompleteData | null {
    const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);
    // Check if the cache is expired
    if (!timestamp || Date.now() - parseInt(timestamp) > this.CACHE_DURATION) {
      return null;
    }
    const cached = localStorage.getItem(this.CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }

  /**
   * Saves student data to local storage
   * @param {StudentData} data - Student data to cache
   */
  private static saveStudentsToCache(data: StudentData): void {
    localStorage.setItem(this.STUDENTS_CACHE_KEY, JSON.stringify(data));
  }

  /**
   * Clears the autocomplete data cache.
   */
  static clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
    localStorage.removeItem(this.CACHE_TIMESTAMP_KEY);
    localStorage.removeItem(this.STUDENTS_CACHE_KEY);
  }
}
