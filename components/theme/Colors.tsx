export const Colors = {
  light: {
    primary: "#374151",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D1D5DB",
    onPrimaryContainer: "#111827",

    secondary: "#4B5563",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E5E7EB",
    onSecondaryContainer: "#111827",

    background: "#FFFFFF",
    onBackground: "#0F172A",

    surface: "#F1F5F9",
    surfaceTint: "rgba(255,255,255,0.09)",
    onSurface: "#0F172A",

    surfaceVariant: "#CBD5E1",
    onSurfaceVariant: "#1F2937",

    outline: "#475569",
    outlineVariant: "#E2E8F0",

    elevation: {
      level0: "#FFFFFF", // TÄMÄ ON TAUSTA
      level1: "#F1F5F9",
      level2: "#E2E8F0", // KORTIT MÄÄRITELTY TÄHÄN
      level3: "#CBD5E1",
      level4: "#94A3B8",
      level5: "#64748B",
    },

    error: "#DC2626",
    onError: "#FFFFFF",

    surfaceDisabled: "rgba(15,23,42,0.12)",
    onSurfaceDisabled: "rgba(15,23,42,0.38)",

    backdrop: "rgba(15,23,42,0.55)",
  },

  dark: {
    primary: "#F3F4F6",
    onPrimary: "#111827",
    primaryContainer: "#374151",
    onPrimaryContainer: "#F9FAFB",

    secondary: "#9CA3AF",
    onSecondary: "#111827",
    secondaryContainer: "#4B5563",
    onSecondaryContainer: "#F3F4F6",

    background: "#0A0A0F",

    surface: "#12121A",
    surfaceTint: "rgba(255,255,255,0.09)",
    onSurface: "#F3F4F6",

    surfaceVariant: "#16161A",
    onSurfaceVariant: "#D1D5DB",

    outline: "#6B7280",
    outlineVariant: "#1F2937",

    elevation: {
      level0: "#0A0A0F",  // TAUSTA
      level1: "#141420",
      level2: "#1E1E2A",  // KORTIT MÄÄRITELTY TÄHÄN
      level3: "#2A2A3A",
      level4: "#36364A",  // ESIM DIALOGIT
      level5: "#4A4A60",
    },

    error: "#e42424",
    onError: "#111827",

    surfaceDisabled: "rgba(243,244,246,0.10)",
    onSurfaceDisabled: "rgba(243,244,246,0.35)",

    backdrop: "rgba(0,0,0,0.85)",
  },
} as const;