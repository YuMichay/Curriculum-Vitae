export interface AuthFormProps {
  type: 'login' | 'signup' | 'forgot-password',
};

export interface AuthData {
  email: string,
  password: string,
}