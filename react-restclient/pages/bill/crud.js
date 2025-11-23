import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import BillDialog from "@/components/BillDialog";
import BillTable from "@/components/BillTable";
import { getBills, createBill, updateBill, deleteBill } from "@/restclient/bill";
import ErrorBanner from "@/components/MessageBanner";

const TEST_BILLS = [
    { billID: 1, payeeName: 'Ali', paymentDue: 35.2, paid: false },
    { billID: 2, payeeName: 'PayPal', paymentDue: 42.9, paid: true },
];

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
            if (bill.billId > 0) {
                // update
                await updateBill(bill.billId, bill);
                setBills(bills.map((b) => (b.billId === bill.billId ? bill : b)));
            } else {
                // add a new one
                var newBill = await createBill(bill);
                setBills([...bills, newBill]);
            }
        } catch (e) {
            setMessageStatus({ message: e.message, isError: true });
        }
    };

    // delete a bill
    const handleDelete = async (id) => {
        console.log("id: ", id);
        try {
            await deleteBill(id);
            loadData();
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

                <BillDialog
                    open={dlgShow}
                    onClose={() => setDlgShow(false)}
                    onSave={handleSaveBill}
                    bill={selBill}
                />
                <BillTable bills={bills} onEdit={handleEdit} onDelete={handleDelete} />
            </Box>
        </div>
    );
}