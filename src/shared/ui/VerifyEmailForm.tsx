import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useVerification } from "../hooks/useVerification.tsx";
import { verifyEmailSchema } from "../config/schemas/verifySchema.ts";
import { VerifyMailInput } from "cv-graphql";

const VerifyEmailForm: React.FC = () => {
  const { verifyMail, loading, error } = useVerification();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
  });

  const onSubmit = (data: VerifyMailInput) => {
    verifyMail(data);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <div className="form-header">
        <Typography variant="h4">Welcome Back</Typography>
        <Typography variant="h6">Hello again! Enter your verification code to continue</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs">
            <div className="form-verification-code">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Verification Code"
                    fullWidth
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 6,
                      style: {
                        fontSize: "2rem",
                        letterSpacing: "0.5rem",
                        textAlign: "center",
                      },
                    }}
                    error={!!errors.otp}
                    helperText={errors.otp?.message}
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
            {loading ? "Loading" : "Confirm"}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default VerifyEmailForm;
