import { Container, Paper, TextField, Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    image: "",
    interests: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/createAvatar", {
      method: "POST",
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    setFormValues({
      name: "",
      image: "",
      interests: "",
      description: "",
    });
    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Create New Avatar</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              value={formValues.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="image"
              fullWidth
              id="outlined-basic"
              label="Image"
              variant="outlined"
              onChange={handleChange}
              value={formValues.image}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="interests"
              fullWidth
              id="outlined-basic"
              label="Interests"
              variant="outlined"
              onChange={handleChange}
              value={formValues.interests}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Create
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
