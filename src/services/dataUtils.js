// dataUtils.js
import axios from 'axios';
import * as xlsx from 'xlsx';

export const getCompaniesData = async (dataType) => {
  const url = `/data/${dataType}.json`; // Adjust the URL based on the data type

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${dataType} data:`, error.message);
    throw error;
  }
};

export async function readExcelData() {
  const excelUrl = '/origen-datos-junior.xlsx';

  try {
    const response = await axios.get(excelUrl, { responseType: 'arraybuffer' });
    const excelData = xlsx.read(response.data, { type: 'buffer' });

    // Assuming your Excel sheet is named 'Sheet1'
    const sheetData = xlsx.utils.sheet_to_json(excelData.Sheets['Sheet1']);

    // Map the data here, assuming your columns are named consistently
    const mappedData = sheetData.map(item => ({
      ID_EMPRESA: item.ID_EMPRESA,
      ID_AREA: item.ID_AREA,
      RUT_TRABAJADOR: item.RUT_TRABAJADOR,
      NOMBRE_TRABAJADOR: item.NOMBRE_TRABAJADOR,
      EDAD: item.EDAD,
      PROFESION: item.PROFESION,
      CARGO: item.CARGO,
    }));

    return mappedData;
  } catch (error) {
    console.error('Error reading Excel data:', error.message);
    throw error;
  }
}

export const readJsonData = async () => {
  const jsonUrl = '/data.json';

  try {
    const response = await axios.get(jsonUrl);
    return response.data;
  } catch (error) {
    console.error('Error reading JSON data:', error.message);
    throw error;
  }
};
