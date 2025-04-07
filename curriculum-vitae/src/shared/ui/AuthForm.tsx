import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInput } from "cv-graphql";
import { Box, Button, IconButton, InputAdornment, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { AuthFormProps } from "../types/auth";
import { schema } from "../config/schema";

import { useSignup } from "../hooks/useSignup";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading: loadingSignup, error: errorSignup } = useSignup();
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

  const onSubmit = (data: AuthInput) => {
    if (type === "signup") {
      signup(data);
    }
  };
  
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <div className="form-header">
        <Typography variant="h4">{type === "signup" ? "Register Now" : type === "login" ? "Welcome Back" : "Forgot Password"}</Typography>
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
          {errorSignup && (
            <Box sx={{ color: "red", textAlign: "center" }}>
              {errorSignup.message}
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
            {loadingSignup ? "Loading" : type === "signup" ? "Create Account" : type === "login" ? "Log in" : "Reset Password"}
          </Button>

          <ListItem component={Link} to={type !== "login" ? "/auth/login" : "/auth/forgot-password"}>
            <ListItemText>{type === "signup" ? "I have an account" : type === "login" ? "Forgot Password" : "Cancel"}</ListItemText>
          </ListItem>
        </div>
      </form>
    </Box>
  );
};

export default AuthForm;