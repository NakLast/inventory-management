# Inventory Management

A lightweight inventory management system built with **EJS** for templating and **Google Sheets** as the database.

## Features

- 📦 Add, update, and delete inventory items
- 📊 Track stock levels and inventory changes
- 📑 Uses Google Sheets as a backend database
- 🌐 Simple web-based interface with EJS templating
- 🚀 Backend powered by **Express.js**

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (EJS for templating)
- **Backend:** **Node.js, Express.js**
- **Database:** Google Sheets API

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/inventory-management.git
   cd inventory-management
   npm install
   ```

2. **Install dependencies**
   ```sh
   pnpm install
   ```
   
3. **Set up Google Sheets API**
    - Create a Google Cloud project.
    - Enable the Google Sheets API.
    - Generate service account credentials and share your sheet with the service account email.

4. **Create an ```.env``` file** and add your Google Sheets credentials
   ```
   GOOGLE_SHEET_ID=your_google_sheet_id
   GOOGLE_DEPLOYMENT_ID=your_google_deployment_id
   ```

5. **Run the server**
   ```sh
   npm start
   ```
