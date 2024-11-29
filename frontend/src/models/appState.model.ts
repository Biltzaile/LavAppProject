interface CompanyData {
  nombre: string;
  nit: string;
  telefono: string;
  direccion: string;
  logo: string;
}

interface ThemeColors {
  primario: string;
  foregroundPrimario: string;
}

export interface AppConfig {
  empresa: CompanyData;
  tema: ThemeColors;
}

export interface AppState {
  empresa: CompanyData | null;
  tema: ThemeColors | null;
  isLoading: boolean;
  error: string | null;
  fetchConfig: () => Promise<void>;
  setCompanyData: (data: CompanyData) => void;
  setThemeColors: (colors: ThemeColors) => void;
  resetStore: () => void;
}
