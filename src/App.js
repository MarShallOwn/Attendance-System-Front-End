import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login/Login";
import SystemWrapper from "./components/SystemWrapper/SystemWrapper";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile/index";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import CreateUser from "./components/User/CreateUser";
import EditUser from "./components/User/EditUser";
import ViewUser from "./components/User/ViewUser";
import { Snackbar, Alert } from "@mui/material";
import { connect } from "react-redux";
import { flashActions } from "./actions/flashMessageAction";
import DepartmentList from "./components/Department/DepartmentList";
import Department from "./components/Department/Department";
import CreateHoliday from "./components/Holiday/CreateHoliday";
import Holiday from "./components/Holiday/Holiday";
import EditHoliday from "./components/Holiday/EditHoliday";
import ViewHoliday from "./components/Holiday/ViewHoliday";
import HolidayList from "./components/Holiday/HolidayList";

const App = (props) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={props.flashBox.show}
        onClose={() => props.flashMessageHandler("close")}
      >
        <Alert
          onClose={() => props.flashMessageHandler("close")}
          severity={props.flashBox.flashType}
          className="flash-box"
        >
          {props.flashBox.flashMessage}
        </Alert>
      </Snackbar>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <SystemWrapper>
                <Home />
              </SystemWrapper>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/list"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <User component={UsersList} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/create"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <User component={CreateUser} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/edit"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <User component={EditUser} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/view"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <User component={ViewUser} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/department/list"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <Department component={DepartmentList} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />

          <Route
            path="/holiday/list"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <Holiday component={HolidayList} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />

          <Route
            path="/holiday/create"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <Holiday component={CreateHoliday} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />

          <Route
            path="/holiday/edit"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <Holiday component={EditHoliday} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/holiday/view"
            element={
              <PrivateRoute>
                <SystemWrapper>
                  <Holiday component={ViewHoliday} />
                </SystemWrapper>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    flashBox: state.flashMessageReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessageHandler: (handlerType) => {
      dispatch(flashActions.flashMessage(handlerType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
