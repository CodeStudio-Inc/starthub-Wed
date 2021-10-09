import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from  'react-redux'
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import {Formik, Form} from 'formik'
import MultipleStepForm from './MultipleStepForm'
import { FormStep } from './MultipleStepForm'
import {teams, vision, proposition, product, market, business, investment} from './Steps'
import * as actionCreators from '../../store/actionCreators'

import './Diagnostics.css'
 const Diagnostics = () => {

     const [teamsValue, setTeamsValue] = useState(0)
     const [visionValue, setVisionValue] = useState(0)
     const [propositionValue, setPropositionValue] = useState(0)
     const [productValue, setProductValue] = useState(0)
     const [marketValue, setMarketValue] = useState(0)
     const [businessValue, setBusinessValue] = useState(0)
     const [investmentValue, setInvestmentValue] = useState(0)

     const [teamsHeader, setTeamsHeader] = useState('')
     const [teamsDesc, setTeamsDesc] = useState('')

     const userId = useSelector(state => state.auth.userId)
     const _value = useSelector(state => state.requests.values)

     const dispatch = useDispatch()

     useEffect(() =>{
         dispatch(actionCreators.getValues())
     },[])

    const handleTeamsOnChange = (e) => {
        setTeamsValue(e.target.value)
        dispatch(actionCreators.setTeamsValue(teamsValue))

        if(teamsValue === 10) {
            setTeamsHeader('How sure are you that your team members are commited')
            setTeamsDesc('Your Team players are commited if;')
        }
        if(teamsValue === 20) {
            setTeamsHeader('Teams Level 2 Header')
            setTeamsDesc('Teams Level 2 Description')
        }
        if(teamsValue === 30) {
            setTeamsHeader('Teams Level 3 Header')
            setTeamsDesc('Teams Level 3 Description')
        }
    }


    const handleVisionOnChange = (e) => {
        setVisionValue(e.target.value)
        dispatch(actionCreators.setVisionValue(visionValue))
    } 

    const handlePropositionOnChange = (e) => {
        setPropositionValue(e.target.value)
        dispatch(actionCreators.setPropositionValue(propositionValue))
    }

    const handleProductOnChange = (e) => {
        setProductValue(e.target.value)
        dispatch(actionCreators.setProductValue(productValue))
    }

    const handleMarketOnChange = (e) => {
        setMarketValue(e.target.value)
        dispatch(actionCreators.setMarketValue(marketValue))
    }

    const handleBusinessOnChange = (e) => {
        setBusinessValue(e.target.value)
        dispatch(actionCreators.setBusinessValue(businessValue))
    }

    const handleInvestmentOnChange = (e) => {
        setInvestmentValue(e.target.value)
        dispatch(actionCreators.setInvestmentValue(investmentValue))
    }

    const handleStepsSubmit = () => {
        dispatch(actionCreators.addValues(teamsValue, visionValue, propositionValue, productValue, marketValue, businessValue, investmentValue, (res) => {
            if(res.success) {
                dispatch(actionCreators.getValues())
                alert('Thank you, You have done a Great Job here')
            } 
        }))
    }

    // console.log(userId)
    
    const filter_value = _value.filter(e => e.creator === userId)
    
    // console.log(_value)
    const last_value = filter_value && filter_value.slice(-1).pop()

    return (
        <div className="main">
            <div className="steps">
            <h2>Business Diagnostics</h2>
            <MultipleStepForm
                initialValues={{
                    teams: teams,
                    vision: vision,
                    proposition: proposition,
                    product: product,
                    market: market,
                    business: business,
                    investment: investment
                }}
                onSubmit={handleStepsSubmit}
            >
                <FormStep 
                stepName="Team"
                onSubmit={() => console.log('Step 1 submit')}
                >
                    <div className="step">
                        {/* <div className="step-row">
                            <input type="radio" />
                            <p>We have more than two skilled, smart and committed people</p>
                        </div>
                        <div className="step-row">
                            <input type="radio" />
                            <p>Our Healthy Team Dynamics allows Ownership</p>
                        </div> */}
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.teams}
                                marks={teams}
                                onChange={handleTeamsOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
                <FormStep 
                stepName="Problem & Vision"
                onSubmit={() => console.log('Step 1 submit')}
                >
                    <div className="step">
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.vision}
                                marks={vision}
                                onChange={handleVisionOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
                <FormStep 
                stepName="Value Proposition"
                onSubmit={() => console.log('Step 1 subit')}
                >
                    <div className="step">
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.proposition}
                                marks={proposition}
                                onChange={handlePropositionOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
                <FormStep 
                stepName="Product"
                onSubmit={() => console.log('Step 1 subit')}
                >
                    <div className="step">
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.product}
                                marks={product}
                                onChange={handleProductOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
                <FormStep 
                stepName="Market"
                onSubmit={() => console.log('Step 1 subit')}
                >
                    <div className="step">
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.market}
                                marks={market}
                                onChange={handleMarketOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
                <FormStep 
                stepName="Business Model"
                onSubmit={() => console.log('Step 1 subit')}
                >
                    <div className="step">
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.business}
                                marks={business}
                                onChange={handleBusinessOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
                <FormStep 
                stepName="Investment and exit"
                onSubmit={() => console.log('Step 1 subit')}
                >
                    <div className="step">
                        <Stack  sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                orientation="vertical"
                                defaultValue={last_value && last_value.investment}
                                marks={investment}
                                onChange={handleInvestmentOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
            </MultipleStepForm>
            </div>
            {/* <div className="description">
                <div className="description-header">
                    <h3>{teamsHeader}</h3>
                </div>
                <h5>{teamsDesc}</h5>
            </div> */}
        </div>
    )
}

export default Diagnostics

