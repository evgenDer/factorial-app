import React, { ReactNode } from 'react';
import { 
  FluentProvider, 
  webLightTheme, 
  webDarkTheme,
  Theme
} from '@fluentui/react-components';


interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
 
  const getOfficeTheme = (): Theme => {
    return prefersDark ? webDarkTheme : webLightTheme;
  };

  const theme = getOfficeTheme();

  return (
    <FluentProvider theme={theme}>
      {children}
    </FluentProvider>
  );
};