/*
 * Use this file to initialize database in a Postgres Database server
*/

Drop Table if Exists Bills;

-- User roles table
CREATE TABLE Bills (
    BillID SERIAL PRIMARY KEY,
    PayeeName VARCHAR(100) NOT NULL,
    PaymentDue FLOAT8 NOT NULL,
	Paid BOOL NOT NULL, 
    CreatedBy VARCHAR(50),
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO Bills (PayeeName, PaymentDue, Paid, CreatedBy)
VALUES
('Apple Pay', 100.20, false, 'yyao1'),
('AliPay', 98.5, true, 'ytao1'),
('Paypal', 43.8, false, 'yyao1'),
('Amzon', 200.20, true, 'ytao1');