import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (location.pathname === "/auth/signup") {
      setIsActive(true);
    } else if (location.pathname === "/auth/login") {
      setIsActive(false);
    }
  }, [location.pathname]);

  const handleClick = (type: string) => {
    setIsActive((prev) => !prev);

    if (type === 'signup') {
      navigate('/auth/signup');
    } else if (type === 'login') {
      navigate('/auth/login');
    }
  };

  return (
    <header>
      <div className={`signup-button${isActive ? " active-button" : ""}`}>
        <Button variant="text" color={isActive ? "secondary" : "primary"} onClick={() => handleClick("signup")}>Sign Up</Button>
      </div>
      <div className={`login-button${!isActive ? " active-button" : ""}`}>
        <Button variant="text" color={!isActive ? "secondary" : "primary"} onClick={() => handleClick("login")}>Log In</Button>
      </div>
    </header>
  );
};

export default Header;