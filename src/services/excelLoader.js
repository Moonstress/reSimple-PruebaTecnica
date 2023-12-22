// excelLoader.js

import axios from 'axios';
import xlsx from 'xlsx';

export async function loadExcelData() {
  const excelUrl = '../data/origen-datos-junior.xlsx';  // Replace with the actual URL or local path

  try {
    const response = await axios.get(excelUrl, { responseType: 'arraybuffer' });
    const excelData = xlsx.read(response.data, { type: 'buffer' });

    // Assuming your Excel sheet is named 'Sheet1'
    const sheetData = xlsx.utils.sheet_to_json(excelData.Sheets['Sheet1']);

    return sheetData;
  } catch (error) {
    console.error('Error loading Excel data:', error.message);
    throw error;
  }
}


