import { AppBar, Toolbar, Typography, Box, Link, IconButton, Menu, MenuItem } from "@mui/material";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function NavBar() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role ?? "User";
  console.log("role: ", role);

  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" component="div">
            Home
          </Typography>
        </Link>

        <Link href="/bill/crud" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" component="div" sx={{ ml: 3 }}>
            Bill CRUD
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* Signed in：Display username + role */}
        <SignedIn>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.username || user?.primaryEmailAddress?.emailAddress}
            {" "}({role})
          </Typography>

          {/* Clerk Icon + menu */}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Non-signed in: Dispaly Login */}
        <SignedOut>
          <Link
            href="/sign-in"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "16px",
            }}
          >
            <Typography variant="body1">
              Login
            </Typography>
          </Link>
        </SignedOut>
      </Toolbar>
    </AppBar>
  </Box>
}