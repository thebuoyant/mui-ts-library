import type { Preview } from '@storybook/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    )
  ]
};

export default preview;