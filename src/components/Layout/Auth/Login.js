import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import logo from '../../../assets/images/logo.png'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import './Auth.css'
const Login = (props) => {

    const [visible, setVisible] = useState(false)
    const [type, setType] = useState('password')

    const [state, setState] = useState({
        email: 'tugumeandrew@starthubafrica.org',
        password: 'CatalyzerAdmin!',
        message: ''
    })

    const loading = useSelector(state => state.auth.loading)
    
    
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(actionCreators.removeUser())
    },[])

    const handleLogin = () => {
        dispatch(actionCreators.login(state.email, state.password, (res) => {
            if (res.success === false) {
                setState({ message: 'The password is invalid or the user does not exist' })
            }
        }))
    }

    const makeVisible = () => {
        setType('text')
        setVisible(true)
    }

    const makeInvisible = () => {
        setType('password')
        setVisible(false)
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
                    {/* <input
                        type="password"
                        placeholder="password"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    /> */}
                <div className="form-row">
                    <input
                        type={type}
                        placeholder="password"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    />
                    {!visible ? <VisibilityIcon  onClick={makeVisible} className="visible-icon" style={{color:'rgba(0,0,0,0.3)', fontSize:'30px', marginRight:'0.5rem'}} /> : null}
                    {visible ? <VisibilityOffIcon onClick={makeInvisible} className="visible-icon" style={{color:'rgba(0,0,0,0.3)', fontSize:'30px', marginRight:'0.5rem'}}/> : null}
                </div>
                </div>
                <button onClick={handleLogin}>{loading ? 'Loading...' : 'Login'}</button>
                <div className="link-container">
                    {/* <button>Forgot password?</button> */}
                    {/* <button onClick={() => props.history.push('/signup')}>SignUp</button> */}
                </div>
            </div>
            <h5 style={{ color: '#dfa126' }}>{state.message}</h5>
        </div>
    )
}

export default Login
