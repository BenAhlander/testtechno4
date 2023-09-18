import { Container, Paper, TextField, Typography } from "@mui/material";
import Card from "@/components/Card";

import Grid from "@mui/material/Unstable_Grid2";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const [activeAvatar, setActiveAvatar] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const generateImage = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/generateAvatar", {
      method: "POST",
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    setActiveAvatar(data);
    setIsLoading(false);
  };

  const saveAvatar = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    const response = await fetch("/api/createAvatar", {
      method: "POST",
      body: JSON.stringify(activeAvatar),
    });
    const data = await response.json();
    console.log(data);
    setActiveAvatar(null);
    setFormValues({
      name: "",
      description: "",
    });
    setIsSaving(false);
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
              label="Name"
              variant="outlined"
              onChange={handleChange}
              value={formValues.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              fullWidth
              label="description"
              variant="outlined"
              onChange={handleChange}
              value={formValues.description}
            />
          </Grid>
          {!activeAvatar ? (
            <Grid item xs={12}>
              <LoadingButton
                loading={isLoading}
                fullWidth
                variant="contained"
                onClick={generateImage}
              >
                Generate Image
              </LoadingButton>
            </Grid>
          ) : (
            <>
              <Grid item xs={6}>
                <LoadingButton
                  loading={isLoading}
                  fullWidth
                  variant="contained"
                  onClick={generateImage}
                >
                  Try Again
                </LoadingButton>
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                  loading={isSaving}
                  fullWidth
                  variant="contained"
                  onClick={saveAvatar}
                >
                  Save
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Card
                  name={activeAvatar.name}
                  image={activeAvatar.image_url}
                  description={activeAvatar.description}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
