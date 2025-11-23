import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { formatUTCtoLocal } from "@/utils/localtime";

export default function BillTable({ bills, onEdit, onDelete }) {
  const columns = [
    { field: "billID", headerName: "ID", width: 80 },
    { field: "payeeName", headerName: "Payee", width: 200 },
    { field: "paymentDue", headerName: "Payment Due", width: 130, type: "number" },
    { field: "paid", headerName: "Paid", width: 130, type: "bool" },
    { field: "createdAt", headerName: "Created At", width: 160, renderCell: (params) => formatUTCtoLocal(params.value) },
    { field: "updatedAt", headerName: "Update At", width: 160, renderCell: (params) => formatUTCtoLocal(params.value) },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(params.row.billID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={bills} columns={columns} getRowId={(row) => row.billID} pageSize={10} />
    </div>
  );
}
