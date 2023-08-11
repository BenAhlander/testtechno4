import { Button, Container, Paper, TextField, Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export default function Create() {
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
    const response = await fetch("/api/createAvatar", {
      method: "POST",
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    console.log(data);
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
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Image"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Interests"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Description"
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
