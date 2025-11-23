import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import BillTable from "@/components/BillTable";
//import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

const TEST_BILLS = [
  { billId: 1, payeeName: 'Ali', paymentDue: 35.2, paid: false },
  { billId: 2, payeeName: 'PayPal', paymentDue: 42.9, paid: true },
];

export default function Home() {
    const [bills, setBills] = useState([]);
    //const navigate = useNavigate();

    const loadData = () => {
        //getBills().then((res) => setBills(res.data));
        setBills(TEST_BILLS);
    };

    useEffect(() => {
        loadData();
    }, []);

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
                    <Button variant="contained" onClick={() => navigate("/bills/new")}>
                    New Bill
                    </Button>
                </Box>
                <BillTable bills={bills} onDelete={handleDelete} />
            </Box>
        </div>
    );
}