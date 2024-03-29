import { toast } from "react-toastify"

export default function toastMessage(message, type) {
  toast[type](message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
