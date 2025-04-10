import { CircularProgress, Stack } from "@mui/material"

const Spinner: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "10vh",
        width: "100%"
      }}
    >
      <CircularProgress />
    </Stack>
  )
};

export default Spinner;