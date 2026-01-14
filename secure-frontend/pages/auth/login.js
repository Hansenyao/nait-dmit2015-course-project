import { Box } from "@mui/material";
import { SignIn, ClerkLoaded } from "@clerk/nextjs";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default function Home() {
    const router = useRouter();
    const redirectUrl = router.query.redirect_url || "/bill/crud";

    return (
        <div>
            <Header />
            <NavBar />
            <Box sx={{ flexGrow: 1, ml: 3, mt: 2 }}>
                <h1>Bill Management | Login</h1>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, mb: 4 }}>
                <Box sx={{ width: 400 }}>
                    <ClerkLoaded>
                        <SignIn routing="hash"
                            afterSignInUrl={redirectUrl}
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    footerAction: {
                                        display: 'none',
                                    },
                                },
                            }}
                        />
                    </ClerkLoaded>
                </Box>
            </Box>
        </div>
    );
}