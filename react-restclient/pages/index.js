import { Stack, Typography } from "@mui/material";
import Box from '@mui/material/Box';

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <NavBar />
      <Box sx={{ flexGrow: 1, ml: 3, mt: 2 }}>
        <h1>DMIT2015 - Course Project | Home</h1>
        <Stack spacing={2} sx={{ mt:2 }}>
          <Typography>Name: Youfang Yao</Typography>
          <Typography>Student ID: 200582794</Typography>
          <Typography>Program: DMIT Software Development</Typography>
          <Typography>Email: yyao8@nait.ca</Typography>
        </Stack>
      </Box>
    </div>
  );
}
