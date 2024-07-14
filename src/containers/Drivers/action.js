import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"

export const getDrivers =
    (params = {}) =>
        (dispatch) => {
            dispatch({
                type: actionTypes.GET_DRIVERS_PENDING,
            })

            const options = {
                method: "get",
                url: API.GET_DRIVERS,
                params: params,
                callback: (data) => {
                    dispatch({
                        type: actionTypes.GET_DRIVERS_SUCCESS,
                        payload: data,
                    })
                },
                errorActionType: actionTypes.GET_DRIVERS_FAILURE,
                dispatch,
            }

            makeRequest(options)
        }