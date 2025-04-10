export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export interface AuthFormProps {
  type: "login" | "signup";
}