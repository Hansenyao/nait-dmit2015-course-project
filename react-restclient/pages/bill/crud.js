import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import BillDialog from "@/components/BillDialog";
import BillTable from "@/components/BillTable";

const TEST_BILLS = [
  { billId: 1, payeeName: 'Ali', paymentDue: 35.2, paid: false },
  { billId: 2, payeeName: 'PayPal', paymentDue: 42.9, paid: true },
];

export default function Home() {
    const [open, setOpen] = useState(false);
    const [bills, setBills] = useState([]);

    const loadData = () => {
        //getBills().then((res) => setBills(res.data));
        setBills(TEST_BILLS);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSaveBill = (bill) => {
        console.log("Saved bill:", bill);
        // TODO: Add / Update bill to backend

        // Update in local
        setBills([...bills, bill]);
    };

    const handleDelete = async (id) => {
        await deleteBill(id);
        loadData();
    };

    return (
        <div>
            <Header />
            <NavBar />
            <h1>DMIT2015 - Course Project | CRUD</h1>

            <Box sx={{ padding: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                    New Bill
                    </Button>
                </Box>

                <BillDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={handleSaveBill}
                />
                <BillTable bills={bills} onDelete={handleDelete} />
            </Box>
        </div>
    );
}