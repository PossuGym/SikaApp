/**
 * VÄRITEEMAT
 */

// Asiallinen
export const Colors = {
  light: {
    primary: "#005AC1", 
    onPrimary: "#FFFFFF",
    primaryContainer: "#D8E2FF",
    onPrimaryContainer: "#001A41",

    secondary: "#575E71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DBE2F9",
    onSecondaryContainer: "#141B2C",

    // Taustaväri
    background: "#FEFBFF", 
    onBackground: "#1B1B1F",

    // Pinnat (Kortit ja modalit)
    surface: "#FAF9FD",
    surfaceTint: "#005AC1",
    onSurface: "#1B1B1F",

    // Variantteja käytetään esim. valitsemattomissa syötteissä
    surfaceVariant: "#E1E2EC",
    onSurfaceVariant: "#44474F",

    // Reunat
    outline: "#74777F",
    outlineVariant: "#C4C6D0",

    // Elevation-tasot
    elevation: {
      level0: "transparent",
      level1: "#F3F4F9",
      level2: "#EDEFF7",
      level3: "#E7EAF4",
      level4: "#E5E9F3",
      level5: "#E1E5F1",
    },

    error: "#BA1A1A",
    onError: "#FFFFFF",

    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",

    backdrop: "rgba(46, 48, 54, 0.4)",
  },

  dark: {
    primary: "#ADC6FF",
    onPrimary: "#002E69",
    primaryContainer: "#004494",
    onPrimaryContainer: "#D8E2FF",

    secondary: "#BFC6DC",
    onSecondary: "#293041",
    secondaryContainer: "#3F4759",
    onSecondaryContainer: "#DBE2F9",

    background: "#1B1B1F", 
    onBackground: "#E3E2E6",

    surface: "#1B1B1F",
    surfaceTint: "#ADC6FF",
    onSurface: "#E3E2E6",

    surfaceVariant: "#44474F",
    onSurfaceVariant: "#C4C6D0",

    outline: "#8E9099",
    outlineVariant: "#44474F",

    elevation: {
      level0: "transparent",
      level1: "#232429",
      level2: "#282A30",
      level3: "#2D2F37",
      level4: "#2F3139",
      level5: "#33353E",
    },

    error: "#FFB4AB",
    onError: "#690005",

    surfaceDisabled: "rgba(227, 226, 230, 0.12)",
    onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",

    backdrop: "rgba(0, 0, 0, 0.7)",
  },
} as const;

/**
 * TEEMAN KOOT, SPACINGIT, YMS
 */
export const Theme = {
  colors: Colors,
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      xxl: 28,
      xxxl: 52,
    },
    weights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 164,
  },
  fab: {
    size: 64,
    bottom: 128 // sijainti alareunasta
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    round: 999,
  },
  borderWidth: {
    thin: 0.5,
    medium: 1,
    thick: 2,
  },
  shadows: {
    card: '0px 1px 3px rgba(12,15,20,0.06)',
    dialog: '0px 8px 20px rgba(12,15,20,0.16)',
  },
} as const;