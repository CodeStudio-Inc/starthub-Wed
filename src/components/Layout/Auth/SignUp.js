import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as actionCreators from '../../store/ActionCreators'
import logo from '../../../assets/images/logo.png'


import './Styles.css'
const SignUp = (props) => {

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        message: ''
    })

    const dispatch = useDispatch()

    const handleSignUp = () => {
        dispatch(actionCreators.register(state.username, state.email, state.password, (res) => {
            if (res.success === false) {
                setState({
                    message: 'User already Exists'
                })
            }
            if (res.success === true) {
                setState({
                    message: 'User Registered Successfully'
                })

                setTimeout(() => {
                    props.history.push('/')
                }, 2000)
            }
        }))
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-form">
                    <img src={logo} />
                    <h3>SignUp</h3>
                    <input
                        placeholder="Username"
                        value={state.username}
                        onChange={(e) => setState({ ...state, username: e.target.value })}
                    />
                    <input
                        placeholder="Email"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    />
                </div>
                <button onClick={handleSignUp}>SignUp</button>
                <div className="link-container">
                    <button onClick={() => props.history.push('/')}>Already have an Account</button>
                </div>
            </div>
            <h5 style={{ color: '#dfa126' }}>{state.message}</h5>
        </div>
    )
}

export default SignUp
