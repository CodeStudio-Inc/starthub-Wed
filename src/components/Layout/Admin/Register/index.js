import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './reg.css'
const Register = (props) => {

    const [state, setState] = useState({
        username: '',
        base_key: '',
        link: '',
        email: '',
        password: '',
        message: ''
    })

    const [visible, setVisible] = useState(false)

    const loading = useSelector(state => state.auth.loading)

    const dispatch = useDispatch()

    useEffect(()=>{
        setState({
            message:''
        })
    },[])

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
        { id: '10', value: 'Grab Gas', link: 'https://airtable.com/shrA1l6DuXXqURJq5', key:'appBSbKZsl25qlcNM'  },
        { id: '10', value: 'Figurines', link: 'https://airtable.com/shrdDhapsg4GoHEBU', key:'appB7nXdkzqsLZ9vh'  },
        { id: '10', value: 'Qiribu', link: 'https://airtable.com/shrUFVM2sXsFLQ1H2', key:'appwJOpJwLfq68Dyi'  },
        { id: '11', value: 'Tech Rafiki', link: 'https://airtable.com/shrEut5jM1Ukl4KO6', key:'appoXAPWZMqkdEb8Y'  },
        { id: '11', value: 'Devine Renewable Energy', link: 'https://airtable.com/shrEut5jM1Ukl4KO6', key:'appoXAPWZMqkdEb8Y'  }
    ]


    const handleSignUp = () => {
        
        dispatch(actionCreators.signUp(state.username, state.base_key, state.link, state.email, state.password, (res) => {
            if (res.success === true) {
                setState({
                    message: 'Startup registered Successfully',
                    email:'',
                    password:''
                })
            }
            if (res.success === false) {
                setState({
                    message: 'User already Exists'
                })
            }
        }))
    }

    return (
        <div className="reg-container">
            <div className="auth-container">
            <div className="auth-card" >
                <div className="auth-form">
                    {/* <img src={logo} /> */}
                    <h3>Register Startup</h3>
                    <div className="drop-down">
                        <div className="drop-down-left" onClick={() => setVisible(false)}>
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
                <button onClick={handleSignUp}>save</button>
            </div>
            <h5 style={{ color: '#dfa126' }}>{state.message}</h5>
        </div>
        </div>
    )
}

export default Register