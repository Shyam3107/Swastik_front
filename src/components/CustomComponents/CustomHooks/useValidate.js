import { useState } from "react";

const useValidate = () => {
  const [error, setError] = useState({});

  const defaultMssg = "This Field is Required";

  const handleValidate = (fieldId, fieldValue, customValidate) => {
    // customValidate is array of {mssg:"if validation failed mssg",check:(value)=>return value conditons}
    let newError = { ...error };
    delete newError[fieldId];
    if (customValidate) {
      console.log("Cutom Vlidate call");
    } else {
      if (!fieldValue) {
        newError[fieldId] = defaultMssg;
      }
    }
    setError(newError);
  };

  return [error, handleValidate];
};

export default useValidate;
