export const API_ROUTES = {
  BASE: "http://127.0.0.1:8000/api",
  STUDENTS: {
    BASE: "/estudiantes",
    PREVIEW: "/estudiante-preview",
    LIST: "/lista-estudiantes",
    DETAIL: "/estudiantes/:id",
  },
  FILES: {
    DOWNLOAD: "/archivos/:id/download",
  },
  REGISTROS: {
    BASE: "/registros",
    DETAIL: "/registros/:id",
  },
  FIELDS: {
    EDIT: "/editarcampos",
  },
} as const;

export const createApiUrl = (
  route: string,
  params: Record<string, string | number> = {},
): string => {
  let url = `${API_ROUTES.BASE}${route}`;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value.toString());
  });
  return url;
};
