import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import logo from '../../../assets/images/logo.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Auth.css'
const SignUp = (props) => {

    const [state, setState] = useState({
        username: '',
        base_key: '',
        link: '',
        email: 'Safari12@gmail.com',
        password: 'pass0123',
        message: ''
    })

    const [visible, setVisible] = useState(false)

    const loading = useSelector(state => state.auth.loading)

    const dispatch = useDispatch()

    // const c = a.localeCompare(b)

    const selectValues = [
        { id: '1', value: 'OnScore Africa', link: 'https://airtable.com/shrS60MIjPY7P7Kjm', key:'appANh1i0ahXP7AGU' },
        { id: '2', value: 'Solfix', link: 'https://airtable.com/shrFcv5412RcqTY12', key:'appbpvHcj2Q15vNzy' },
        { id: '3', value: 'Rada Safaris', link: 'https://airtable.com/shr2GR4P4oXwe5cAe', key:'appoRLGhKdUVYK1NM' },
        { id: '4', value: 'Zetu Africa', link: 'https://airtable.com/shrRhXagaPU7aODbM', key:'apphw40UWLjnJPjZ3' },
        { id: '5', value: 'Social Clark', link: 'https://airtable.com/shrVhqMWFeuR74ptl', key:'appgl1zZt7ywDcV0b' },
        { id: '6', value: 'Inove Labs', link: 'https://airtable.com/shrIl79SiMwDDGzOC', key:'appbmvwW0TZ28Sa6b' },
        { id: '7', value: 'OMNI Gym', link: 'https://airtable.com/shrzeSKqTNbM0e7cu', key:'appQ04g5RD4qDczpq' },
        { id: '8', value: 'WAGE Spices', link: 'https://airtable.com/shrzXfvNSq8KQR3Zv', key:'apps7QYiTB1PUEnNV' },
        { id: '9', value: 'Isharc', link: 'https://airtable.com/shr47nlDolKpj03Hv', key:'appNClAqhvh57qFEJ' },
        { id: '10', value: 'Economic Misfit', link: 'https://airtable.com/shrdriyhRdFT3nOjo', key:'appXH1YhoI4ll5sxT'  },
    ]


    const handleSignUp = () => {
        
        dispatch(actionCreators.signUp(state.username, state.base_key, state.link, state.email, state.password, (res) => {
            if (res.success === false) {
                setState({
                    message: 'User already Exists'
                })
            }
        }))
    }

    return (
        <div className="auth-container">
            <div className="auth-card" >
                <div className="auth-form">
                    <img src={logo} />
                    <h3>SignUp</h3>
                    <div className="drop-down">
                        <div className="drop-down-left">
                            {state.username ? <p>{state.username}</p> : <p>-select startup-</p>}
                        </div>
                        <div className="drop-down-right" onClick={() => setVisible(true)}>
                            <ExpandMoreIcon style={{ fontSize: '18px' }} className="drop-down-icon" onClick={() => setVisible(true)} />
                        </div>
                    </div>
                    {visible ? <div className="drop-down-modal">
                        {selectValues.map(selector => (
                            <div className="drop-down-row" key={selector.id} onClick={() =>{
                                setState({ ...state, username: selector.value, link: selector.link, base_key: selector.key })
                                setVisible(false)
                            } }>
                                <h4>{selector.value}</h4>
                            </div>
                        ))}
                    </div>: null}
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
                <button onClick={handleSignUp}>{loading ? 'Loading...' : 'SignUp'}</button>
                <div className="link-container">
                    <button onClick={() => props.history.push('/')}>Already have an Account</button>
                </div>
            </div>
            <h5 style={{ color: '#dfa126' }}>{state.message}</h5>
        </div>
    )
}

export default SignUp
