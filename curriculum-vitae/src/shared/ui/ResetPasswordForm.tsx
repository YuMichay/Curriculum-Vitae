import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordInput } from "cv-graphql";
import { Box, Button, IconButton, InputAdornment, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { resetPasswordSchema } from "../config/schemas/resetPasswordSchema";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { resetPassword, loading, error } = useResetPassword();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    }
  });

  const onSubmit = (data: ResetPasswordInput) => {
    resetPassword(data);
  };
  
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <div className="form-header">
        <Typography variant="h4">Reset Password</Typography>
        <Typography variant="h6">We will send you an email with further instructions</Typography>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs">
          <div className="form-password">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
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
          {error && (
            <Box sx={{ color: "red", textAlign: "center" }}>
              {error.message}
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
            {loading ? "Loading" : "Reset Password"}
          </Button>

          <ListItem component={Link} to={"/auth/login"}>
            <ListItemText>Cancel</ListItemText>
          </ListItem>
        </div>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
