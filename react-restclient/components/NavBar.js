import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircle from '@mui/icons-material/AccountCircle';

import Link from 'next/link'

export default function NavBar() {
  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" component="div">
            Home
          </Typography>
        </Link>
        <Link href="/bill/crud">
          <Typography variant="h6" component="div" sx={{ ml: 3 }}>
            Bill CRUD
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
}