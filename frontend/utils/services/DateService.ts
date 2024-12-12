import { IDateService } from '../interfaces/IDateService';

export class DateService implements IDateService {
  private readonly months: { [key: string]: string } = {
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
    'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
    'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
  };

  public parseSpanishDateToISO(dateString: string): string {
    try {
      const [day, , month, , year] = dateString.split(' ');
      const monthNumber = this.months[month.toLowerCase()];
      const paddedDay = day.padStart(2, '0');
      
      return `${year}-${monthNumber}-${paddedDay}`;
    } catch (error) {
      console.error('Error parsing date:', error);
      return ''; 
    }
  }

  public calculateAge(birthDate: string): number {
    try {
      const today = new Date();
      const birth = new Date(birthDate);
      
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      // Ajuste si aún no ha llegado el mes de cumpleaños
      // o si estamos en el mes pero no ha llegado el día
      if (
        monthDiff < 0 || 
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }
      
      return age;
    } catch (error) {
      console.error('Error calculating age:', error);
      return 0;
    }
  }
}

// Singleton instance for global use
export const dateService = new DateService();