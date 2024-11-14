import { useEffect } from "react";
import { useAppStore } from "@/contexts/appSore";
import { updateThemeColors } from "@/lib/theme";

export const useThemeSync = () => {
  const colors = useAppStore((state) => state.tema);

  useEffect(() => {
    if (colors) {
      updateThemeColors(colors.primario, colors.secundario);
    }
  }, [colors]);
};
