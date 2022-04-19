import React from "react"
import styles from "./styles.module.css"
import CircularProgress from "@mui/material/CircularProgress"

export default function BackDropLoader() {
  return (
    <div className={styles.container}>
      <CircularProgress color="primary" />
    </div>
  )
}
