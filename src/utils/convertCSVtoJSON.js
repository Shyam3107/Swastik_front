import * as XLSX from 'xlsx'
import { makeRequest } from "../APIs/APIs"

// Convert Array of Arrays to Arrays of Objects with first row as Key
export const arrayToObj = (data) => {
  let arr = []
  let header = data[0]
  if (!header) header = []
  // Values start from 2nd row
  for (let i = 1; i < data.length; i++) {
    let obj = {}
    // Empty arrary [[]]
    if (data[i].length === 1 || data[i].length === 0) continue
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = data[i][j]
    }
    arr.push(obj)
  }
  return arr
}

const convertCSVToJson = async (file, options) => {
  // Parse Excel File in Array of objects
  const reader = new FileReader();
  reader.onload = (evt) => { // evt = on_file_select event
    /* Parse data */
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: 'binary' });
    /* Get first worksheet */
    const ws = wb.Sheets[wb.SheetNames[0]];
    // Convert to array of arrays 
    const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
    makeRequest({ ...options, payload: { data: arrayToObj(dataParse) } })
  };
  reader.readAsBinaryString(file)
}

export default convertCSVToJson
