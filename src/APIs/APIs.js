import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage";
import { error, warn } from "../utils/constants";

export const backendURL = "http://localhost:5000";

const modules = {
  attendance: "/attendance",
  login: "/login",
  leave: "/leave",
  student: "/student",
};

export const API = {
  //LOGIN
  LOGIN: `${modules.login}`,

  // ATTENDANCE
  GET_ATTENDANCE: `${modules.attendance}/getAttendance`,
  ADD_ATTENDANCE: `${modules.attendance}/addAttendance`,

  // LEAVE
  GET_LEAVE: `${modules.leave}/getLeave`,
  ADD_LEAVE: `${modules.leave}/addLeave`,
  EDIT_LEAVE: `${modules.leave}/editLeave`,

  //STUDENTS
  ADD_STUDENTS: `${modules.student}/addStudents`,
  GET_STUDENTS: `${modules.student}/getStudents`,
};

export const handleError = (dispatch = () => {}, action = {}, err) => {
  console.log("err ", err);
  let errMssg = err.response ? err.response.data.error : "Some Error Occured";
  dispatch(action);
  if (!navigator.onLine) return toastMessage("You Are Offline", warn);
  return toastMessage(errMssg, error);
};
