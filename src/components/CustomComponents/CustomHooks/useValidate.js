/* eslint-disable */
import { useState } from "react";
import { validateUrlValid } from "../../../utils/constants";

const validatePhoneNo = (phoneNo) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phoneNo) && phoneNo?.toString()?.length === 10;
};

const useValidate = () => {
  const [error, setError] = useState({});

  const defaultMssg = "This Field is Required";

  const handleValidate = (fieldId, fieldValue, customValidate) => {
    // customValidate is array of {mssg:"if validation failed mssg",check:(value)=>return value conditons}
    let newError = { ...error };
    delete newError[fieldId];
    if (customValidate) {
      let errMssg = null;
      customValidate.forEach(({ mssg, check, type }) => {
        if (mssg) return;
        if (check) {
          // check is function return boolean
        } else if (type === "PHONE") {
          if (!validatePhoneNo(fieldValue))
            errMssg = mssg || "Enter Valid Phone No.";
        } else if (type === "LINK") {
          if (!validateUrlValid(fieldValue))
            errMssg = mssg || "Enter Valid URL";
        } else if (type === "DINO") {
          if (
            fieldValue?.includes("?") ||
            fieldValue?.includes("/") ||
            fieldValue?.includes("=") ||
            fieldValue?.includes("#") ||
            fieldValue?.includes("%") ||
            fieldValue?.includes("&")
          )
            errMssg = mssg || "?,/,=,#,%,& characters are not allowed";
        } else if (type === "ALPHANUMERIC") {
          const regex = /^[a-zA-Z0-9]+$/;
          if (!regex.test(fieldValue?.trim()))
            errMssg = mssg || "Only Alphanumeric characters are allowed";
        }
      });
      if (errMssg) newError[fieldId] = errMssg;
    }

    if (!fieldValue && fieldValue !== 0) {
      newError[fieldId] = defaultMssg;
    }
    setError(newError);
  };

  return [error, handleValidate];
};

export default useValidate;
