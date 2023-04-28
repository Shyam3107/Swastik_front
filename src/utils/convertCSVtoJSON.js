import Papa from "papaparse"
import readXlsxFile from "read-excel-file"

import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage"
import { error } from "./constants"
import { makeRequest } from "../APIs/APIs"

// Convert Array of Arrays to Arrays of Objects with first row as Key
export const arrayToObj = (data) => {
  let arr = []
  let header = data[0]
  if (!header) header = []
  for (let i = 1; i < data.length; i++) {
    let obj = {}
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
    readXlsxFile(file).then((data) => {
      makeRequest({ ...options, payload: { data: arrayToObj(data) } })
    })
  }
  return []
}

export default convertCSVToJson
