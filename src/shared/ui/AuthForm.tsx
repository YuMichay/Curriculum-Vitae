import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInput } from "cv-graphql";
import { Box, Button, IconButton, InputAdornment, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { AuthFormProps } from "../types/auth.ts";
import { useSignup } from "../hooks/useSignup.tsx";
import { useLogin } from "../hooks/useLogin.tsx";
import { authSchema } from "../config/schemas/authSchema.ts";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading: loadingSignup, error: errorSignup } = useSignup();
  const { login, loading: loadingLogin, error: errorLogin } = useLogin();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data: AuthInput) => {
    if (type === "signup") {
      signup(data);
    } else if (type === "login") {
      login(data);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <div className="form-header">
        <Typography variant="h4">{type === "signup" ? "Register Now" : "Welcome Back"}</Typography>
        <Typography variant="h6">{type === "signup" ? "Welcome! Sign up to continue" : "Hello again! Log in to continue"}</Typography>
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
        </div>

        <div className="form-error">
          {errorSignup && (
            <Box sx={{ color: "red", textAlign: "center" }}>
              {errorSignup.message}
            </Box>
          )}
          {errorLogin && (
            <Box sx={{ color: "red", textAlign: "center" }}>
              {errorLogin.message}
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
            {loadingSignup || loadingLogin ? "Loading" : type === "signup" ? "Create Account" : "Log in"}
          </Button>

          <ListItem component={Link} to={type !== "login" ? "/auth/login" : "/auth/forgot-password"}>
            <ListItemText>{type === "signup" ? "I have an account" : "Forgot Password"}</ListItemText>
          </ListItem>
        </div>
      </form>
    </Box>
  );
};

export default AuthForm;
