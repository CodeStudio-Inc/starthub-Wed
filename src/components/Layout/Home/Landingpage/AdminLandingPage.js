import React, { useState, useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import ModalUI from '../../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import Register from '../AdminPanel/Register'
import * as actionCreators from '../../../store/actionCreators'
import moment from 'moment'
import { Progress, message } from 'antd'
import { Line } from 'react-chartjs-2'
import emailjs from '@emailjs/browser'
import apiKeys from '../AdminPanel/Loans/emailKeys'

const AdminLandingPage = ({startups, adminNavigate}) => {

    const [int, setInternal] = useState(false)
    const [cat, setCatalyzer] = useState(false)
    const [acad, setAcademy] = useState(false)
    const [state, setState] = useState({
        username:'',
        email:'',
        category:'',
        password:'',
        base_key:'',
        link:''
    })

    const internal = startups.filter(el => el.category === 'internal')
    const catalyzer = startups.filter(el => el.category === 'catalyzer')
    const academy = startups.filter(el => el.category === 'academy')
    const users = useSelector(state => state.admin.users)
    const users_activity = useSelector(state => state.auth.user_activity)
    // console.log(users_activity);


    const dispatch = useDispatch()

    const form = useRef()

    const current_date = moment(Date()).format('MMM YYYY')
    const enrolledUsers = users.filter(e => moment(e.dateCreated).format('MMM YYYY') === current_date)

    useEffect(() => {
        getUser()
        getUserActivity()
    },[])


    const getUserActivity = () => dispatch(actionCreators.getUserActivity())


    const week1End = 7
    const week2End = 15
    const week3End = 23
    const week4End = 31
    

    let dates = []

    users_activity && users_activity.forEach(element => {
        dates.push({day: parseInt(moment(element.date).format('DD'))})
    });

    // console.log(dates)

    const Week1 = dates.filter(el => el.day <= week1End).length
    const Week2 = dates.filter(el => el.day > week1End && el.day < week2End).length
    const Week3 = dates.filter(el => el.day > week2End && el.day < week3End).length
    const Week4 = dates.filter(el => el.day > week3End && el.day < week4End).length
    

    let values = [Week1, Week2, Week3, Week4]
    let labels = ['Week1', 'week2', 'week3', 'week4']
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'User Activity',
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data: values
            }
        ],
        options: {
                scales: {
                    yAxes: [{
                    ticks: {
                        precision: 0
                    }
                    }]
                }
                }
    }
 
    const getUser = () => dispatch(actionCreators.getUsers())

    const signUpInternal = () => {
        dispatch(actionCreators.signUp(state.username, state.email,'internal', state.password))
        setState({
            username:'',
            email:'',
            category:'',
            password:'',
            base_key:'',
            link:''
        })
    }
    const signUpAcademy = () => {
        dispatch(actionCreators.signUp(state.username, state.email,'academy', state.password))
        setState({
            username:'',
            email:'',
            category:'',
            password:'',
            base_key:'',
            link:''
        })
    }
    const signUpCatalyzer = () => {
        dispatch(actionCreators.signUp(state.username, state.email,'catalyzer', state.password, state.base_key, state.link))
        setState({
            username:'',
            email:'',
            category:'',
            password:'',
            base_key:'',
            link:''
        })
    }

    const sendEmail = (e) => {
        e.preventDefault()
        // setLoading(true)
        emailjs.sendForm(apiKeys.SERVICE_ID, apiKeys.TEMPLATE_ID, form.current, apiKeys.USER_ID)
            .then((result) => {
                message.info("Message Sent, We will get back to you shortly", result.text)
                // setLoading(false)
            },
                (error) => {
                    message.info("An error occurred, Please try again", error.text)
                })
    }

    return (
        <div className="admin-menu">
            {int ? <ModalUI>
                <div className="register-form">
                    <div className="register-form-nav">
                        <h3>Internal</h3>
                        <CloseIcon 
                            className="register-form-container-icon"
                            style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)'}}
                            onClick={() => setInternal(false)}
                        />
                    </div>
                    <div className="register-form-container">
                        <input
                            placeholder="Username"
                            value={state.username}
                            onChange={(e) => setState({ ...state, username: e.target.value})}
                        />
                        <input
                            placeholder="Email"
                            value={state.email}
                            onChange={(e) => setState({ ...state, email: e.target.value})}
                        />
                        <input
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value})}
                        />
                        <button onClick={signUpInternal}>Sign up</button>
                    </div>
                </div>
            </ModalUI> : null}
            {acad ? <ModalUI>
                <div className="register-form">
                    <div className="register-form-nav">
                        <h3>Academy</h3>
                        <CloseIcon 
                            className="register-form-container-icon"
                            style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)' }}
                            onClick={() => setAcademy(false)}
                        />
                    </div>
                    <div className="register-form-container">
                        <input
                            placeholder="Username"
                            value={state.username}
                            onChange={(e) => setState({ ...state, username: e.target.value})}
                        />
                        <input
                            placeholder="Email"
                            value={state.email}
                            onChange={(e) => setState({ ...state, email: e.target.value})}
                        />
                        <input
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value})}
                        />
                        <button onClick={signUpAcademy}>Sign up</button>
                    </div>
                </div>
            </ModalUI> : null}
            {cat ? 
                <ModalUI>
                    <Register 
                        username={state.username} 
                        email={state.email} 
                        category={state.category} 
                        password={state.password} 
                        base_key={state.base_key} 
                        link={state.link} 
                        state={state}
                        setState={setState}
                        signup={signUpCatalyzer} 
                        setCatalyzer={setCatalyzer}/>
                </ModalUI>
            : null}
            <div className="admin-menu-content">
                <div className="admin-header">
                    <h1>StartHub</h1>
                    <h5>Welcome to starthub dashboard</h5>
                </div>
                <div className="admin-row">
                    <div className="admin-stat">
                        <h3>Total number of registered users</h3>
                        <h1>{users.length}</h1>
                        <h5>Percentage of total users</h5>
                        <div style={{width: "250px"}}>
                            <Progress 
                                percent={((users.length/100) * 100).toFixed(0)} 
                                size="small" 
                                strokeColor="#F2994A"
                                trailColor="rgba(0,0,0,0.1)"
                                />
                        </div>
                    </div>
                    <div onClick={sendEmail} className="admin-stat">
                        <form ref={form} onSubmit={sendEmail}>
                            <input
                                type="text"
                                name="Fname"
                                value="Business People"
                                hidden
                            />
                        </form>
                        <h3>Teams enrolled this month</h3>
                        <h1>{enrolledUsers.length}</h1>
                        <h5>Percentage of month enrollment</h5>
                        <div style={{width: "250px"}}>
                            <Progress 
                                percent={((enrolledUsers.length/100) * 100).toFixed(0)} 
                                size="small"  
                                strokeColor="#F2994A"
                                trailColor="rgba(0,0,0,0.1)"
                                />
                        </div>
                    </div>
                    <div className="admin-user-activity">
                        <h3>User Activity</h3>
                        <Line
                            data={data}
                            width={100}
                            height={50}
                        />
                    </div>
                </div>
                <div className="admin-header">
                    <h2>Catalyzer Startup Data Tracking</h2>
                </div>
                <div className="admin-header">
                    <h3>Internal</h3>
                </div>
                <div className="admin-header">
                    <div className="separate"></div>
                </div>
                <div className="admin-card-row">
                    {internal.map(s => (
                        <div className="admin-startup-card-column" key={s._id}>
                            <div className="admin-startup-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => setInternal(true)} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
                <div className="admin-header">
                    <h3>Catalyzer</h3>
                </div>
                <div className="admin-header">
                    <div className="separate"></div>
                </div>
                <div className="admin-card-row">
                    {catalyzer.map(s => (
                        <div className="admin-startup-card-column" key={s._id}>
                            <div className="admin-catalyzer-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => setCatalyzer(true)} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
                <div className="admin-header">
                    <h3>Academy</h3>
                </div>
                <div className="admin-header">
                    <div className="separate"></div>
                </div>
                <div className="admin-card-row">
                    {academy.map(s => (
                        <div className="admin-startup-card-column" key={s._id}>
                            <div className="admin-academy-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => setAcademy(true)} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage
