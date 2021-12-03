import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userActions } from './actions/userAction'

const Navbar = props => {

    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/profile">Profile</Link>
            <a onClick={props.logout} href="#">logout</a>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(userActions.logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Navbar)