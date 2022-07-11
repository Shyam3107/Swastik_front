import { Suspense, lazy } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import axios from "axios"
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { backendURL } from "./APIs/APIs"
import BackDropLoader from "./components/CustomComponents/BackDropLoader/BackDropLoader"

const Navigation = lazy(() => import("./components/Navigation/Navigation"))
const Login = lazy(() => import("./components/Login/Login"))

axios.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`
    }
    config.url = backendURL + config.url
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

function App(props) {
  const loggedIn = !props.user.loading && props.user.loggedIn

  return (
    <div className="App">
      <Suspense fallback={<BackDropLoader />}>
        <Router>
          {loggedIn ? <Navigation /> : <Login />}
          <ToastContainer />
        </Router>
      </Suspense>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App)
