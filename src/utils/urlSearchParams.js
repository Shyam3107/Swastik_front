const urlSearchParams = (api, dto = {}) => {
  let searchParams = new URLSearchParams();
  let tempString = "";

  Object.keys(dto).forEach((key) => {
    if (Array.isArray(dto[key])) {
      let stringPara = dto[key]
        .map((val) => {
          return key + "[]=" + val;
        })
        .join("&");
      if (tempString.length) tempString += "&";
      tempString += stringPara;
    } else {
      searchParams.set(key, dto[key]);
    }
  });

  let params = searchParams.toString();
  if (params.length || tempString.length) params = "?" + params;
  if (params.length > 1 && tempString.length > 1) params += "&" + tempString;
  else params += tempString;
  return api + params;
};

export default urlSearchParams;
