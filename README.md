# Expense Tracker

A web-based Expense Tracker application built using React.js, TypeScript, and Tailwind CSS. It helps users manage their income and expenses, monitor their balance, and view monthly financial summaries.

## Features

- **Dashboard:** View total balance, total income, total expenses, and current month's expenses.
- **Add Transactions:** Add both income and expense transactions.
- **Edit Transactions:** Update existing transaction details.
- **Delete Transactions:** Remove transactions when needed.
- **Transaction History:** View all recorded transactions.
- **Search:** Search transactions by description.
- **Filters:** Filter transactions by date, category, and transaction type.
- **Monthly Overview:** View monthly income and expenses using a bar chart.
- **Category Breakdown:** Visualize expenses by category using a doughnut chart.
- **Recent Transactions:** View the latest five transactions on the dashboard.
- **Local Storage:** Automatically save transaction data in the browser's LocalStorage.

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
- Recharts
- Lucide React
- HTML5
- CSS3
- LocalStorage

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── transactions/
│   └── common/
├── context/
├── hooks/
├── pages/
├── utils/
├── types/
├── constants/
├── App.tsx
├── main.tsx
└── index.css
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd expense-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Data Storage

The application uses the browser's LocalStorage to persist transaction data. Transactions remain available after refreshing the browser.

## Application Usage

1. Open the Dashboard to view your financial summary.
2. Click **Add Transaction** to create an income or expense.
3. Enter the transaction details and save.
4. Navigate to the Transactions page to view, search, filter, edit, or delete transactions.
5. Use the dashboard charts to understand monthly income and expense patterns.

## Author

Developed as an individual React.js and TypeScript technical evaluation project.
