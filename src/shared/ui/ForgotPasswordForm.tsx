import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordInput } from "cv-graphql";
import { Box, Button, ListItem, ListItemText, TextField, Typography } from "@mui/material";

import { useForgotPassword } from "../hooks/useForgotPassword.tsx";
import { forgotPasswordSchema } from "../config/schemas/forgotPasswordSchema.ts";

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, loading, error } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword(data);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <div className="form-header">
        <Typography variant="h4">Forgot Password</Typography>
        <Typography variant="h6">We will send you an email with further instructions</Typography>
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

export default ForgotPasswordForm;
