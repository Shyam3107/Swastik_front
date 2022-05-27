import React from "react"
import ReactExport from "react-export-excel"

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export default function DownloadExcel(props) {
  return (
    <ExcelFile
      filename={props.filename}
      element={props.element ? props.element : "Excel"}
    >
      <ExcelSheet data={props.data} name={props.filename}>
        {props.column.map((col, index) => {
          return (
            <ExcelColumn key={index} label={col} value={(row) => row[col]} />
          )
        })}
      </ExcelSheet>
    </ExcelFile>
  )
}
