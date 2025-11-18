/*
 * Use this file to initialize database in a Postgres Database server
*/

Drop Table if Exists Bills;

-- User roles table
CREATE TABLE Bills (
    BillID SERIAL PRIMARY KEY,
    PayeeName VARCHAR(20) NOT NULL,
    PaymentDue FLOAT8 NOT NULL,
	Paid BOOL NOT NULL, 
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);