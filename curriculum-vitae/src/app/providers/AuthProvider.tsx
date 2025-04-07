import { useState, ReactNode, useEffect } from "react";

import { AuthContext } from "../../shared/hooks/useAuth";
import { checkAuth } from "../../shared/lib/checkAuth";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = checkAuth();
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};