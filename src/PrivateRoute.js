import React from "react";
import { Navigate, useLocation } from "react-router";
import authReducer from "./reducers/authReducer";
import {connect} from 'react-redux';


const PrivateRoute = ({ children, user }) => {

    const location = useLocation()

    return(
        <>
        {(localStorage.getItem('user') && user.hasOwnProperty("loggedIn")) ? children : <Navigate to={{ pathname: '/login', state: { from: location } }} />}
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.authReducer
    }
}

export default connect(mapStateToProps)(PrivateRoute);
