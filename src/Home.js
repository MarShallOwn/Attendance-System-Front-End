import axios from 'axios'
import authAxios from './customAxios'
import React, { useEffect } from 'react'
import { userService } from './services/userService'
import { connect } from 'react-redux'
const Home = props => {

    useEffect(() => {
        console.log(localStorage.getItem("user"))
        console.log(props)
    },[])

    const authorizeCheck = () => {
        authAxios.post("/welcome")
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return(
        <div>
            Home
            <button onClick={authorizeCheck}>Authorize check</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.authReducer
    }
}

export default connect(mapStateToProps)(Home)