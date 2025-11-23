import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import BillDialog from "@/components/BillDialog";
import BillTable from "@/components/BillTable";
import { getBills, createBill, updateBill, deleteBill } from "@/restclient/bill";

const TEST_BILLS = [
  { billId: 1, payeeName: 'Ali', paymentDue: 35.2, paid: false },
  { billId: 2, payeeName: 'PayPal', paymentDue: 42.9, paid: true },
];

export default function Home() {
    const [dlgShow, setDlgShow] = useState(false);
    const [bills, setBills] = useState([]);
    const [selBill, setSelBill] = useState([]);

    // load all bills
    const loadData = () => {
        //getBills().then((res) => setBills(res.data));
        setBills(TEST_BILLS);
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
        if (bill.billId > 0) {
            // update
            await updateBill(bill.billId, bill);
            setBills(bills.map((b) => (b.billId === bill.billId ? bill : b)));
        } else {
            // add a new one
            await createBill(bill);
            setBills([...bills, bill]);
        }
    };

    // delete a bill
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