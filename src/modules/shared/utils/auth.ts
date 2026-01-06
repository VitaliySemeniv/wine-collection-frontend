const MOCK_AUTH = true;

export const isAuthenticated = (): boolean => {
  if (MOCK_AUTH) return true;
  return Boolean(localStorage.getItem('token'));
};

export const logout = () => {
  localStorage.removeItem('token');
};
