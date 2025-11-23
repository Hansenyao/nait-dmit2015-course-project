import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import BillDialog from "@/components/BillDialog";
import ErrorBanner from "@/components/MessageBanner";

import { getBills, createBill, updateBill, deleteBill } from "@/restclient/bill";

// Import BillTable Dynamicly，disable SSR
const BillTable = dynamic(() => import("@/components/BillTable"), { ssr: false });

export default function Home() {
    const [dlgShow, setDlgShow] = useState(false);
    const [bills, setBills] = useState([]);
    const [selBill, setSelBill] = useState([]);
    const [messageStatus, setMessageStatus] = useState({ message: "", isError: false });

    const closeError = () => setMessageStatus({ message: "", isError: false });

    // load all bills
    const loadData = () => {
        try {
            getBills().then((res) => {
                setBills(res)
            });
        } catch (e) {
            setMessageStatus({ message: e.message, isError: true });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // edit the selected bill
    const handleEdit = (bill) => {
        setSelBill(bill);
        setDlgShow(true)
    }

    // save bill for add/edit
    const handleSaveBill = async (bill) => {
        try {
            if (bill.billID > 0) {
                // update
                await updateBill(bill.billID, bill);
                setBills(bills.map((b) => (b.billID === bill.billID ? bill : b)));
                setMessageStatus({ message: `Bill (ID: ${bill.billID}) has updated successfully`, isError: false });
            } else {
                // add a new one
                var newBill = await createBill(bill);
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
            await deleteBill(id);
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
                    <Button variant="contained" onClick={() => {
                        setSelBill(null)
                        setDlgShow(true)
                    }}
                    >
                        New Bill
                    </Button>
                </Box>

                <BillDialog open={dlgShow} onClose={() => setDlgShow(false)} onSave={handleSaveBill} bill={selBill} />
                <BillTable bills={bills} onEdit={handleEdit} onDelete={handleDelete} />
            </Box>
        </div>
    );
}