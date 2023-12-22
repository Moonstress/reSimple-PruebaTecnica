# ReSimple Tech Test

## Overview

This project is the result of the technical test for the Junior Developer position at ReSimple. It involves retrieving, manipulating, and displaying data from the "origen-datos-junior.xlsx" Excel file, along with logical groupings of Companies, Areas, and Workers. The frontend interface is designed to be responsive and adaptable to multiple devices.

## Features

- Data retrieval from "origen-datos-junior.xlsx" and display on the frontend.
- Logical groupings: Companies -> Areas -> Workers.
- Use of "diccionario-de-datos.json" for obtaining names for Companies and Areas.
- Additional functionality to check and avoid rendering workers with duplicate RUT keys.

## Technologies Used

- **Frontend:** React
- **Styling:** CSS with BEM methodology
- **Data Handling:** JavaScript
- **External Libraries:** @primer/octicons-react

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/reSimple-TechTest.git

2. **Install dependencies:**

bash
Copy code
cd reSimple-TechTest
npm install
Run the application:

bash
Copy code
npm start
Open the application in your browser: http://localhost:3000

3. **Folder Structure:**
- src/: Contains the source code.
- components/: React components used in the project.
- css/: Stylesheets for styling the components.
- services/: Utility functions and data handling services.

**Usage**

- Navigate through the Companies, Areas, and Workers using the provided interface.
- Expand and collapse sections to view detailed information.
- Ensure uniqueness of RUT keys is maintained.


**License**
This project is licensed under the MIT License.