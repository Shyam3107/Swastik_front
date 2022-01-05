import { useState } from "react";

const validatePhoneNo = (phoneNo) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phoneNo);
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
        } else if (type === "PHONE") {
          if (!validatePhoneNo(fieldValue))
            errMssg = mssg || "Enter Valid Phone No.";
        }
      });
      if (errMssg) newError[fieldId] = errMssg;
    }

    if (!fieldValue) {
      newError[fieldId] = defaultMssg;
    }

    setError(newError);
  };

  return [error, handleValidate];
};

export default useValidate;
