# DMIT2015 Course Project Part 1 - Backend Instruction

This instruction descripts how to build, test, and run backend application for this project.

## Development Environment

- OS: Windows 11

- Database: PostgresSQL 17

- Development Tool: Visual Studio 2022

  - Dependency Package: Npgsql.EntityFrameworkCore.PostgreSQL

## Install Database

- Download and install PostgresSQL from https://www.postgresql.org/

- DBMS tool pgAdmin4 is required

## Initialize Database

After PostgresSQL is installed, open pgAdmin4 to initial database in local

- Run pgAdmin4, register a local server, such as “LocalPostgresSQL”

- Create a database under this server, named "dmit2015-course-project"

- Open the Query Tool for this database, in the Query input window, paste file initial-db.sql content in it

- Execute this quey to create Bills table in this database, and 4 test records will be added to this table

- Go back server “LocalPostgresSQL”, check it's connenction property by right context menu. Note down Host name, Port, Username, and password, we will use them later.


## Configure Database Connection String

There are 2 options for database connection string

- Set it to the project setting file appsettings.json

- Set it as a project secret

In this project, I recommend set database connection string in project secret.

- Use Visual Studio 2022 open solution file ./cshap-restapi/cshap-restapi.sln

- Select project in solution view, and open context menu and select 'Manage User Secrets'

- In the edit window, use the database connection property you got in previous step, to set connection string as bellow:

```
    {
        "ConnectionStrings": {
            "DefaultConnection": "Host=localhost;Port=5432;Database=dmit2015-course-project;Username=postgres;Password={Your_Database_Password};Trust Server Certificate=true;"
        }
    }
```

## Run

- In Visual Studio, use menu Run to build and run project as Http mode

- A Swagger page is openned in browser after run successfully.

- The backend server uses 5281 as the port in default, you can change it in file ./Properties/launchSettings.json

- In default, backend endpoints are following

  - Get all bills
    ```
    GET http://localhost:5281/restapi/BillDtos
    ```

  - Get bill by id
    ```
    GET http://localhost:5281/restapi/BillDtos/{id}
    ```

  - Create a new bill
    ```
    POST http://localhost:5281/restapi/BillDtos
    ```

  - Update a bill by id
    ```
    PUT http://localhost:5281/restapi/BillDtos/{id}
    ```

  - Delete a bill by id
    ```
    DELETE http://localhost:5281/restapi/BillDtos/{id}
    ```

## Test

There are 2 options to test backend rest API

- Use Swagger page in browser

- Use test cases in file cshap-restapi.http

In this project, I recommend use option 2 to test rest API

- Run this project first

- In Visual Studio, open file cshap-restapi.http throught solution view

- Run each test cases as bellow:

  - Get all bills, send following request
  ```
    GET {{cshap_restapi_HostAddress}}/restapi/BillDtos
    Accept: application/json
  ```

  - Create a new bill, send following request
  ```
    POST {{cshap_restapi_HostAddress}}/restapi/BillDtos
    Accept: application/json
    Content-Type: application/json

    {
        "payeeName":"Appy Pay",
        "paymentDue": 100.10,
        "paid": false
    }
  ```
  
  - Get a bill, send following request
  ```
    GET {{cshap_restapi_HostAddress}}/restapi/BillDtos/5
    Accept: application/json
  ```

  - Update a bill, send following request
  ```
    PUT {{cshap_restapi_HostAddress}}/restapi/BillDtos/5
    Accept: application/json
    Content-Type: application/json

    {
        "billID": 5,
        "payeeName":"Appy Pay",
        "paymentDue": 50,
        "paid": true
    }
  ```
  
  - Delete a bill, send following request
  ```
    DELETE {{cshap_restapi_HostAddress}}/restapi/BillDtos/5
    Accept: application/json
  ```

- You can check response from rest api for each test in Visual Studio window.

- Good Luck!