import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import logo from '../../../assets/images/logo.png'

import './Auth.css'
const Login = (props) => {

    const [state, setState] = useState({
        email: 'stuartkal@gmail.com',
        password: 'starthub@123',
        message: ''
    })

    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(actionCreators.login(state.email, state.password, (res) => {
            if (res.success === false) {
                setState({ message: 'The password is invalid or the user does not exist' })
            }
        }))
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-form">
                    <img src={logo} />
                    <h3>Login</h3>
                    <input
                        type="text"
                        placeholder="Email"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                <div className="link-container">
                    <button>Forgot password?</button>
                    <button onClick={() => props.history.push('/signup')}>SignUp</button>
                </div>
            </div>
            <h5 style={{ color: '#dfa126' }}>{state.message}</h5>
        </div>
    )
}

export default Login
