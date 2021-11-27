export default function uploadFileForm(file) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}
