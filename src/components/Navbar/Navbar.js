import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userActions } from '../../actions/userAction'
import classes from "./Navbar.module.css"
import notificationBell from "../../images/notification.svg"
import styled from 'styled-components'
import { InputWithIcon } from '../../styles/globalStyle'
import searchIcon from "../../images/search.svg"

const Navbar = () => {

    return(
        <div className={classes.navbar}>
            <div className={classes.leftSide}>
                <InputWithIcon icon={searchIcon} width="541px" placeholder="Search" />
            </div>
            <div className={classes.rightSide}>
                <img src={notificationBell} />
                <p className={classes.username}>username</p>
                <div className={classes.profileDiv}>
                    MS
                </div>
            </div>
        </div>
    )
}

//style

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(userActions.logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Navbar)