export interface IDateService {
  parseSpanishDateToISO: (dateString: string) => string;
  calculateAge: (birthDate: string) => number;
}