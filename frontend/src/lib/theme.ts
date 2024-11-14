export const updateThemeColors = (primary: string, secondary: string) => {
  const root = document.documentElement;
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--secondary", secondary);
};
