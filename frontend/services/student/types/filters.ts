export interface DateRangeFilter {
  from: Date | null;
  to: Date | null;
}

export interface Filters {
  gradoEscolaridad: string[];
  fechaProximoSeguimiento: DateRangeFilter;
}

export const DEFAULT_FILTERS: Filters = {
  gradoEscolaridad: [],
  fechaProximoSeguimiento: { from: null, to: null },
};
