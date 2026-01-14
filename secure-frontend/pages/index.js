import { Stack, Typography } from "@mui/material";
import Box from '@mui/material/Box';

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Home.module.css";

const tech_stacks = [
  { section: "Database", tech: "PostgreSQL" },
  { section: "Backend", tech: "C#,ASP.Net" },
  { section: "Frontend", tech: "React,Next.js" },
  { section: "Authentication", tech: "Clerk" },
  { section: "Deployment", tech: "Azure(Database, Backend), Vercel(Frontend)" },
];

const accounts = [
  { role: "ActiveStudent", name: "yyao1", password: "crud-password", operation: "Create Bill/Edit and Delete own bills" },
  { role: "ActiveStudent", name: "ytao1", password: "crud-password", operation: "Create Bill/Edit and Delete own bills" },
  { role: "Accounting", name: "fyang1", password: "crud-password", operation: "View all bills" },
  { role: "Shipping", name: "ysing1", password: "crud-password", operation: "None" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <NavBar />
      <Box sx={{ flexGrow: 1, ml: 3, mt: 2 }}>
        <h1>Bill Management | Home</h1>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <h2>Introduce:</h2>
          <Typography>This is a Full Stack Development project Demo demonstrated how does Database CRUD work, with user authentication and role based authorization.</Typography>
          <Typography>This project uses bellow technoloy stacks:</Typography>
          <table
            style={{
              width: "600px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "40%", border: "1px solid #ccc", padding: "8px 12px" }}>
                  Section
                </th>
                <th style={{ width: "60%", border: "1px solid #ccc", padding: "8px 12px" }}>
                  Technoloy
                </th>
              </tr>
            </thead>

            <tbody>
              {tech_stacks.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                    {item.section}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                    {item.tech}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>How To Use:</h2>
          <Typography>Bellow roles and accounts are provided for demonstration, please use different roles account to login and do CURD operations.</Typography>
          <table
            style={{
              width: "800px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "20%", border: "1px solid #ccc", padding: "8px 12px" }}>
                  Role
                </th>
                <th style={{ width: "20%", border: "1px solid #ccc", padding: "8px 12px" }}>
                  Name
                </th>
                <th style={{ width: "20%", border: "1px solid #ccc", padding: "8px 12px" }}>
                  password
                </th>
                <th style={{ width: "40%", border: "1px solid #ccc", padding: "8px 12px" }}>
                  Operations
                </th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                    {item.role}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                    {item.name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                    {item.password}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                    {item.operation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Stack>
      </Box>
    </div>
  );
}
