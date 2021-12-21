import Papa from "papaparse";

import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage";
import { error } from "./constants";
import { makeRequest } from "../APIs/APIs";

const arrayToObj = (data) => {
  let arr = [];
  const header = data[0];
  for (let i = 1; i < data.length; i++) {
    let obj = {};
    if (data[i].length === 1) continue;
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = data[i][j];
    }
    arr.push(obj);
  }
  return arr;
};

export default async function convertCSVToJson(file, options) {
  Papa.parse(file, {
    complete: (result) => {
      const { data, errors } = result;
      if (errors && errors[0]) return toastMessage(errors[0].message, error);
      makeRequest({ ...options, payload: { data: arrayToObj(data) } });
    },
  });
  return [];
}
