import React, {useState} from 'react'
import { connect } from "react-redux"
import { userActions } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'

const Login = props => {

    const navigate = useNavigate()

    const [fields, setfields] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = () => {
        const {username, password} = fields
        props.login(username, password, navigate)
    }


    return(
        <div>
            <label>Login</label>
            <input onChange={e => setfields({...fields, username: e.target.value})} placeholder="username"></input>
            <input onChange={e => setfields({...fields, password: e.target.value})} placeholder="password"></input>
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password, navigate) => {
            dispatch(userActions.login(username, password, navigate))
        }
    }
}

export default connect( null,mapDispatchToProps)(Login)