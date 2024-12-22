export function formatDateTimeLocal(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  // Crear la fecha usando la zona horaria de Colombia
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getCurrentColombiaDateTime(): Date {
  // Crear fecha en zona horaria local del usuario
  const now = new Date();

  // Convertir a fecha en Colombia
  const colombiaDate = new Date(
    now.toLocaleString("en-US", {
      timeZone: "America/Bogota",
    }),
  );

  return colombiaDate;
}
