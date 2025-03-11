// Define theme colors and variables as constants
export const ThemeColors = {
  // Brand Colors
  brandPrimary: '#C26B1B',
  brandSecondary: '#F5F5F5',
  brandAccent: '#4A90E2',
  
  // Semantic Colors
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  info: '#2196F3',
  
  // Neutral Colors
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
  
  // Chart Colors
  chartColor1: '#4CAF50', // Green
  chartColor2: '#2196F3', // Blue
  chartColor3: '#FFC107', // Yellow
  chartColor4: '#9C27B0', // Purple
  chartColor5: '#FF5722'  // Deep Orange
};

// Spacing
export const Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px', 
  xl: '32px',
  xxl: '48px',
  xxxl: '64px'
};

// Border Radius
export const BorderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px'
};

// Font Sizes
export const FontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  xxl: '1.5rem',    // 24px
  xxxl: '1.875rem', // 30px
  huge: '2.25rem'   // 36px
};

// Inject CSS variables into document
export function injectCssVariables(): void {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      /* Brand Colors */
      --brand-primary: ${ThemeColors.brandPrimary};
      --brand-secondary: ${ThemeColors.brandSecondary};
      --brand-accent: ${ThemeColors.brandAccent};
      
      /* Semantic Colors */
      --success-color: ${ThemeColors.success};
      --warning-color: ${ThemeColors.warning};
      --danger-color: ${ThemeColors.danger};
      --info-color: ${ThemeColors.info};
      
      /* Neutral Colors */
      --white: ${ThemeColors.white};
      --gray-50: ${ThemeColors.gray50};
      --gray-100: ${ThemeColors.gray100};
      --gray-200: ${ThemeColors.gray200};
      --gray-300: ${ThemeColors.gray300};
      --gray-400: ${ThemeColors.gray400};
      --gray-500: ${ThemeColors.gray500};
      --gray-600: ${ThemeColors.gray600};
      --gray-700: ${ThemeColors.gray700};
      --gray-800: ${ThemeColors.gray800};
      --gray-900: ${ThemeColors.gray900};
      --black: ${ThemeColors.black};
      
      /* Background Colors */
      --background-primary: ${ThemeColors.white};
      --background-secondary: ${ThemeColors.gray50};
      --background-tertiary: ${ThemeColors.gray100};
      
      /* Text Colors */
      --text-primary: ${ThemeColors.gray900};
      --text-secondary: ${ThemeColors.gray600};
      --text-muted: ${ThemeColors.gray400};
      
      /* Border Colors */
      --border-color: ${ThemeColors.gray200};
      
      /* Spacing */
      --spacing-xs: ${Spacing.xs};
      --spacing-sm: ${Spacing.sm};
      --spacing-md: ${Spacing.md};
      --spacing-lg: ${Spacing.lg};
      --spacing-xl: ${Spacing.xl};
      
      /* Border Radius */
      --border-radius-sm: ${BorderRadius.sm};
      --border-radius-md: ${BorderRadius.md};
      --border-radius-lg: ${BorderRadius.lg};
      --border-radius-xl: ${BorderRadius.xl};
      --border-radius-full: ${BorderRadius.full};
      
      /* Font Sizes */
      --font-size-xs: ${FontSizes.xs};
      --font-size-sm: ${FontSizes.sm};
      --font-size-base: ${FontSizes.base};
      --font-size-lg: ${FontSizes.lg};
      --font-size-xl: ${FontSizes.xl};
      --font-size-2xl: ${FontSizes.xxl};
      --font-size-3xl: ${FontSizes.xxxl};
    }
  `;
  document.head.appendChild(style);
} 