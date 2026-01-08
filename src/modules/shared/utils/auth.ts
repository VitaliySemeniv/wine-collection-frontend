const MOCK_AUTH = false;

export const isAuthenticated = (): boolean => {
  if (MOCK_AUTH) return true;
  return Boolean(localStorage.getItem('token'));
};

export const logout = () => {
  localStorage.removeItem('token');
};
