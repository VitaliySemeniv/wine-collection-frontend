import { useState } from 'react';

export const useSnackbar = () => {
  const [state, setState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  return {
    snackbar: state,
    showSuccess: (message: string) => setState({ open: true, message, severity: 'success' }),
    showError: (message: string) => setState({ open: true, message, severity: 'error' }),
    close: () => setState((p) => ({ ...p, open: false })),
  };
};
