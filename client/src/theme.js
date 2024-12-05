export const colorTokens = {
  grey: {
    0: "#FFFFFF",    // Clean white for minimal backgrounds
    10: "#F5F5F5",    // Very light grey for subtle background areas
    50: "#E0E0E0",    // Soft grey for section dividers or card backgrounds
    100: "#D0D0D0",   // Light, cool grey for some subtle accents
    200: "#B0B0B0",   // Neutral grey for secondary content
    300: "#A0A0A0",   // Medium grey for less emphasized text
    400: "#707070",   // Darker grey for borders or inactive elements
    500: "#404040",   // Main text color, dark but not too harsh
    600: "#2C2C2C",   // Slightly darker grey for important sections
    700: "#1A1A1A",   // Almost black, ideal for headers or main text
    800: "#121212",   // Deep, almost black grey for high contrast
    900: "#0A0A0A",   // Deepest grey for final contrast and focal areas
  },
  primary: {
    50: "#A3A8B3",    // Soft steel blue for subtle highlights
    100: "#6E7584",   // Muted, sophisticated blue for hover or focus states
    200: "#4A4F59",   // Cool greyish-blue for key elements
    300: "#2C3036",   // Dark slate blue for subtle buttons or accents
    400: "#1A1E22",   // Very dark blue for hover states
    500: "#0D1115",   // Deep navy blue for primary elements
    600: "#0B0F13",   // Rich navy for darker accents
    700: "#080C10",   // Almost black navy for deep contrasts
    800: "#060A0D",   // Darker navy for emphasis or active states
    900: "#040506",   // Blackened navy for minimalistic contrast
  },
};



export const themeSettings = (mode) => {
  return {
    palette: {
      primary: {
        dark: colorTokens.primary[700],  // Dark navy for high contrast buttons
        main: colorTokens.primary[500],  // Main deep navy for primary elements
        light: colorTokens.primary[50],  // Light steel blue for subtle accents
      },
      neutral: {
        dark: colorTokens.grey[700],  // Dark grey for headings and emphasized text
        main: colorTokens.grey[500],  // Neutral grey for standard text
        mediumMain: colorTokens.grey[400],  // For secondary content or borders
        medium: colorTokens.grey[200],  // Lighter grey for background sections
        light: colorTokens.grey[50],  // Soft grey for clean, minimalistic background
      },
      background: {
        default: colorTokens.grey[10],  // Subtle background color for the app
        alt: colorTokens.grey[0],       // Pure white for specific elements like cards or sections
      },
    },
    typography: {
      fontSize: 12,
      h1: {
        fontSize: 40,
        color: colorTokens.grey[900],  // Deep grey for primary headings, ensuring high visibility
      },
      h2: {
        fontSize: 32,
        color: colorTokens.grey[800],  // Slightly lighter grey for secondary headings
      },
      h3: {
        fontSize: 24,
        color: colorTokens.grey[700],  // Muted grey for sub-headings
      },
      h4: {
        fontSize: 20,
        color: colorTokens.grey[600],  // Professional grey for smaller headings
      },
      h5: {
        fontSize: 16,
        color: colorTokens.grey[500],  // Standard text color, professional and easy to read
      },
      h6: {
        fontSize: 14,
        color: colorTokens.grey[400],  // Light grey for smaller text, ideal for footnotes or captions
      },
    },
  };
};

