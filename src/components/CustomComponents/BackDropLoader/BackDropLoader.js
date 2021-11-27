import React from "react";
import styles from "./styles.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function BackDropLoader() {
  return (
    <div className={styles.container}>
      <CircularProgress color="primary" />
    </div>
  );
}
