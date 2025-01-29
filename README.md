# Personal Finance Manager

A personal finance manager application that allows users to track their income, expenses, and savings. Users can create custom categories for transactions, set savings goals, and view detailed reports for monthly and yearly expenses, income, and savings.

Postman Documentation : https://documenter.getpostman.com/view/34158537/2sAYQiCTp1

## Features
- **User Authentication:** Users can register and log in.
- **Custom Categories:** Users can create unique categories for transactions. Categories can be shared across users but must be unique per user.
- **Savings Goals:** Users can create and manage savings goals with a target amount and date. Transactions automatically update open goals.
- **Transaction Management:** Users can add, edit, and delete transactions. Changes to transactions handle edge cases like switching from income to expense.
- **Reports:** Users can view monthly and yearly reports of their income, expenses, savings, and spending per category.
- **Category Management:** When a category is deleted, all related transactions are moved to an "unknown" category.

## Edge Cases Handled
- When editing a transaction, if it changes from income to expense (or vice versa), both the changes are reflected correctly.
- When a category is deleted, transactions related to that category are moved to an "unknown" category.
- Categories must be unique for each user but can be common across multiple users. The database is indexed on a compound of `categoryName` and `userId` to ensure uniqueness for each user.

## Tech Stack
- **Backend:** Node.js, JavaScript
- **Database:** MongoDB
- **ORM:** Mongoose

## Installation
- Clone the repository on your local
- Execute `npm install` in the backend folder 
- Create a `.env` file in the root directory of your project and add the following environment variables
  - `PORT=3000`
  - `MONGO_URI=<DBURL>`
  - `JWT_SECRET=<DUMMYKEY>`
- Run `npm run dev`.

# Database Design

The following describes the schema for the personal finance manager system. The application uses MongoDB with Mongoose as the ORM.

## 1. **User Schema**
- **Purpose:** Stores user information.
- **Fields:**
  - `name`: The full name of the user (required).
  - `email`: The email of the user (unique, required).
  - `password`: The password for user authentication (required).

## 2. **Category Schema**
- **Purpose:** Stores categories that a user can create and associate with transactions.
- **Fields:**
  - `userId`: A reference to the `User` model (required). This links categories to a specific user.
  - `name`: The name of the category (required). Categories should have unique names per user.
- **Indexing:** A compound index on `userId` and `name` ensures that each category name is unique to the user.

## 3. **Savings Goal Schema**
- **Purpose:** Stores savings goals for users, such as tracking savings for specific targets.
- **Fields:**
  - `userId`: A reference to the `User` model (required). This links the goal to a specific user.
  - `goalName`: The name or description of the savings goal (required).
  - `goalAmount`: The target amount the user wants to save (required).
  - `savedAmount`: The amount already saved (default: 0).
  - `targetDate`: The target date by which the user wants to reach their goal (required).
  - `status`: The status of the goal. Can be either `"open"` (goal still ongoing) or `"closed"` (goal achieved or no longer tracked). The default value is `"open"`.

## 4. **Transaction Schema**
- **Purpose:** Stores financial transactions for a user, including income and expenses.
- **Fields:**
  - `userId`: A reference to the `User` model (required). This links the transaction to a specific user.
  - `categoryId`: A reference to the `Category` model (required). This links the transaction to a specific category.
  - `amount`: The amount of the transaction (required).
  - `type`: Specifies whether the transaction is an `"income"` or `"expense"` (required).
  - `description`: A brief description of the transaction (optional).
  - `date`: The date the transaction occurred (default: current date).

## Relationships and Key Constraints:
- **User - Category:** Each user can have multiple categories, and each category is unique to a user. Categories are shared among users, but each user must have a unique name for their categories. This is ensured through a compound index on `userId` and `name`.
- **User - Savings Goal:** Each user can have multiple savings goals. The `userId` field references the `User` schema, establishing a one-to-many relationship between users and goals.
- **User - Transaction:** Each transaction is linked to a user and a category. The `userId` and `categoryId` fields reference the `User` and `Category` models, respectively, establishing a relationship between transactions, users, and categories.

## Indexing:
- **Category:** A compound index is applied on the `userId` and `name` fields to ensure that each user has unique category names.

# Sample Data

The following sample data can be used for POST requests in the finance manager system:

## 1. **User Data**
```
{
  "name": "Rishik",
  "email": "rishikseth17@gmail.com",
  "password": "12345678"
}
```
## 2. **Category Data**
```
{
  "name": "Education"
}
```
## 3. **SavingsGoal Data**
```
{
  "goalAmount": 10000,
  "targetDate": "2025-12-31",
  "goalName": "PS5"
}
```
## 4. **Transaction Data**
```
{
  "amount": 2000,
  "categoryId": "679a5047daf8ec7c3ee912aa",
  "description": "Electricity bill refund",
  "type": "income"
}
```
