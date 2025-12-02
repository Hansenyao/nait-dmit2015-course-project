# DMIT2015 Course Project Part 1 - Frontend Instruction

This instruction descripts how to build, test, and run frontend application for this project.

## Development Environment

- OS: Windows 11

- Development Tool: Visual Studio Code

## Configure backend server REST API base URL

- Use Visual Studio Code open project folder

- Go to file react-restclient\restclient\base.js

- Change following url as yours

```
    const BASE_URL = "http://localhost:5281/restapi/BillDtos"
```

## How to Run

- In Visual Studio Code, open a terminal and change to frontend project source code folder

```
    $ cd react-restclient
```

- Install decpendencies

```
    $ npm install
```

- Run 

```
    $ npm run dev
```

- In the terminal, you will see bellow information

```
   ▲ Next.js 16.0.3 (Turbopack)
   - Local:         http://localhost:3000
   - Network:       http://10.0.0.215:3000

 ✓ Starting...
 ✓ Ready in 617ms
```

## How to Test

- Open browser, and input http://localhost:3000 in address and enter

- The home page will open, like bellow

![HomePage](./img/homepage.png)

- Navigate to bill CRUD page by clicking menu 'Bill CRUD'

![HomePage](./img/crudpage.png)

- On this page, we can do CRUD operations for Bill management.

- Good Luck!


# DMIT2015 Course Project Part 2 - Frontend Instruction

Please make sure file .env.local exists and its content as below:

```
# Clerk APIs for test only!
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bWludC1jb2JyYS00LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_WNr3F6N8lb6aEzR4h7r3qFJtr1NdfDjoJ7YtOkX9mi
```

And the build and test steps are same as part 1.

## Accounts for test

You can use below accounts to test

### ActiveStudent

- Username: yyao1, Password: Dmit2015-password 
- Username: ytao1, Password: Dmit2015-password 

### Accounting

- Username: fyang1, Password: Dmit2015-password

### Shipping

- Username: ysing1, Password: Dmit2015-password
