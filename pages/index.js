import { useEffect, useState } from "react";

import Card from "@/components/Card";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Head from "next/head";

export default function Home() {
  const [avatars, setAvatars] = useState([]);
  useEffect(() => {
    fetch("/api/createAvatar")
      .then((res) => res.json())
      .then((data) => setAvatars(data));
  }, []);
  return (
    <>
      <Head>
        <title>Bens Cool App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: "32px" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {avatars.map((avatar, i) => (
              <Grid key={i} xs={12} sm={6} md={4}>
                <Card
                  name={avatar.name}
                  image={avatar.image}
                  description={avatar.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
