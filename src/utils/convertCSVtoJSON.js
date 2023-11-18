import Papa from "papaparse"
//import * as XLSX from 'xlsx'
import readXlsxFile from "read-excel-file"

import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage"
import { error } from "./constants"
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
    if (data[i].length === 1) continue
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = data[i][j]
    }
    arr.push(obj)
  }
  return arr
}

const convertCSVToJson = async (file, options) => {
  const extension = file.name.substr(file.name.length - 3, 3)
  console.log(file)

  // Parse CSV File in array of Objects
  if (extension === "csv") {
    Papa.parse(file, {
      complete: (result) => {
        const { data, errors } = result
        console.log(errors)
        if (errors && errors[0]) return toastMessage(errors[0].message, error)
        makeRequest({ ...options, payload: { data: arrayToObj(data) } })
      },
    })
  } else {
    // Parse Excel File in Array of objects
    // var name = file.name;
    // const reader = new FileReader();
    // reader.onload = (evt) => { // evt = on_file_select event
    //   /* Parse data */
    //   const bstr = evt.target.result;
    //   const wb = XLSX.read(bstr, { type: 'binary' });
    //   /* Get first worksheet */
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   /* Convert array of arrays */
    //   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    //   /* Update state */
    //   console.log("Data>>>" + data);

    //   // This is correct , choose this
    //   const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
    //   console.log("Data Parse>>>", dataParse)
    // };
    // reader.readAsBinaryString(file);


    readXlsxFile(file).then((data) => {
      console.log("Excel data:", data)
      makeRequest({ ...options, payload: { data: arrayToObj(data) } })
    }).catch((err) => {
      console.log("Error :", err)
      return toastMessage("Failed to read the File", error)
    })
  }
  return []
}

export default convertCSVToJson
