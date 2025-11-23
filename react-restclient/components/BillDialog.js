import {useEffect, useState} from 'react'
import { Checkbox, FormControlLabel } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { faker } from '@faker-js/faker';
import { randomNumber } from "@/utils/random";

export default function BillDialog({ open, onClose, onSave, bill: initialBill }) {
    const [bill, setBill] = useState({
        payeeName: "",
        paymentDue: "",
        paid: false
    });

    useEffect(() => {
        if (initialBill) {
            setBill(initialBill);
        } else {
            setBill({ billId: 0, payeeName: "", paymentDue: "", paid: false });
        }
    }, [initialBill]);

    const handleChange = (e) => {
        setBill({ ...bill, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(bill);
        onClose();
    };

    const onGenerate = () => {
        setBill({
            billId: 0,
            payeeName: faker.company.name(),
            paymentDue: randomNumber(),
            paid: false
        })
    }
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{bill.billId > 0 ? "Edit Bill" : "New Bill"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Payee Name"
          name="payeeName"
          fullWidth
          value={bill.payeeName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Payment Due"
          name="paymentDue"
          type="number"
          fullWidth
          value={bill.paymentDue}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
            name="paid"
            checked={bill.paid}
            onChange={(e) =>
              setBill({ ...bill, paid: e.target.checked })
            }
          />
        }
        label="Paid"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onGenerate}>Generate</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
