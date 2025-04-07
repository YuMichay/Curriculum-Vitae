import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, IconButton, InputAdornment, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { AuthData, AuthFormProps } from "../types/auth";
import { schema } from "../config/schema";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  // const { setIsAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const defaultFormValues = type === "signup" || type === "login" ? {
    email: "",
    password: "",
  } : {
    password: "",
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async(data: AuthData) => {
    setLoading(true);
    setError(null);

    navigate("/");

    console.log(data)

    try {
      // const response = await loginUser({email: data.email, password: data.password});
      
      // if (response.data) {
      //   localStorage.setItem("id", JSON.stringify(response.data.id));
      //   localStorage.setItem("username", JSON.stringify(response.data.username));
      //   localStorage.setItem("role", JSON.stringify(response.data.role));
      //   setIsAuth(true);
      //   navigate("/");
      // }
    } catch (err: unknown) {
      setError("Registration failed");
      console.error("Registration error", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <div className="form-header">
        <Typography variant="h4">{type === "signup" ? "Register Now" : type === "login" ? "Welcome Back" : type === "forgot-password" ? "Forgot Password" : "Reset Password"}</Typography>
        <Typography variant="h6">{type === "signup" ? "Welcome! Sign up to continue" : type === "login" ? "Hello again! Log in to continue" : "We will send you an email with further instructions"}</Typography>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs">
        <div className="form-email">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </div>

        {(type === "signup" || type === "login") && (
          <div className="form-password">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        )}
        </div>

        <div className="form-error">
          {error && (
            <Box sx={{ color: "red", textAlign: "center" }}>
              {error}
            </Box>
          )}
        </div>

        <div className="form-buttons">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ minWidth: "200px", marginTop: 2 }}
          >
            {loading ? "Loading" : type === "signup" ? "Create Account" : type === "login" ? "Log in" : "Reset Password"}
          </Button>

          <ListItem component={Link} to={type === "signup" || type === "forgot-password" ? "/auth/login" : "/auth/forgot-password"}>
            <ListItemText>{type === "signup" ? "I have an account" : type === "login" ? "Forgot Password" : "Cancel"}</ListItemText>
          </ListItem>
        </div>
      </form>
    </Box>
  );
};

export default AuthForm;