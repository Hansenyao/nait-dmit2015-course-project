import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import BillDialog from "@/components/BillDialog";
import ErrorBanner from "@/components/MessageBanner";

import { getBills, createBill, updateBill, deleteBill } from "@/restclient/bill";

// Import BillTable Dynamicly，disable SSR
const BillTable = dynamic(() => import("@/components/BillTable"), { ssr: false });

export default function Home() {
    const [bills, setBills] = useState([]);
    const [dlgStatus, setDlgStatus] = useState({ selBill: null, open: false });
    const [messageStatus, setMessageStatus] = useState({ message: "", isError: false });
    const { isSignedIn, getToken } = useAuth();
    const router = useRouter();
    const JWT_TEMPLATE = "dmit2015-jwt";

    const closeError = () => setMessageStatus({ message: "", isError: false });

    // load all bills
    const loadData = async () => {
        try {
            const token = await getToken({ template: JWT_TEMPLATE });
            await getBills(token).then((res) => {
                setBills(res)
            });
        } catch (e) {
            setMessageStatus({ message: e.message, isError: true });
        }
    };

    useEffect(() => {
        if (!isSignedIn) {
            // redirect login page
            router.replace(`/auth/login?redirect_url=${encodeURIComponent(router.asPath)}`);
        } else {
            loadData();
        }
    }, [isSignedIn, router]);

    if (!isSignedIn) return null;

    // edit the selected bill
    const handleEdit = (bill) => {
        setDlgStatus({ selBill: bill, open: true })
    }

    // save bill for add/edit
    const handleSaveBill = async (bill) => {
        try {
            const token = await getToken({ template: JWT_TEMPLATE });
            if (bill.billID > 0) {
                // update
                await updateBill(bill.billID, bill, token);
                setBills(bills.map((b) => (b.billID === bill.billID ? bill : b)));
                setMessageStatus({ message: `Bill (ID: ${bill.billID}) has updated successfully`, isError: false });
            } else {
                // add a new one
                var newBill = await createBill(bill, token);
                setBills([...bills, newBill]);
                setMessageStatus({ message: `Bill (ID: ${newBill.billID}) has created successfully`, isError: false });
            }
        } catch (e) {
            setMessageStatus({ message: e.message, isError: true });
        }
    };

    // delete a bill
    const handleDelete = async (id) => {
        try {
            const token = await getToken({ template: JWT_TEMPLATE });
            await deleteBill(id, token);
            loadData();
            setMessageStatus({ message: `Bill (ID: ${id}) has deleted successfully`, isError: false });
        } catch (e) {
            setMessageStatus({ message: e.message, isError: true });
        }
    };

    return (
        <div>
            <Header />
            <NavBar />
            <Box sx={{ flexGrow: 1, ml: 3, mt: 2 }}>
                <h1>DMIT2015 - Course Project | CRUD</h1>
            </Box>
            <Box sx={{ padding: 3 }}>
                <ErrorBanner message={messageStatus.message} isError={messageStatus.isError} onClose={closeError} />

                <Box sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={() => { setDlgStatus({ selBill: null, open: true }) }} >
                        New Bill
                    </Button>
                </Box>

                <BillDialog open={dlgStatus.open} onClose={() =>
                    setDlgStatus({ selBill: null, open: false })}
                    onSave={handleSaveBill} bill={dlgStatus.selBill}
                />
                <BillTable bills={bills} onEdit={handleEdit} onDelete={handleDelete} />
            </Box>
        </div>
    );
}