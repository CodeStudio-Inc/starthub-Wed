import React,{useState} from 'react'
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

     const teamsvalue = useSelector(state => state.requests.teams)
     const visionvalue = useSelector(state => state.requests.vision)
     const propositionvalue = useSelector(state => state.requests.proposition)
     const productvalue = useSelector(state => state.requests.product)
     const marketvalue = useSelector(state => state.requests.market)
     const businessvalue = useSelector(state => state.requests.business)
     const investmentvalue = useSelector(state => state.requests.investment)

     const dispatch = useDispatch()

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

    console.log(teamsValue)

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

    
    


    return (
        <div className="main">
            <div className="steps">
            <h2>Business Diagnostics</h2>
            <MultipleStepForm
                initialValues={{
                    name:'Hello world',
                    date:'30/09/2021'
                }}
                onSubmit={values => {
                    alert('Thank You!, You have done a great Job')
                }}
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
                                defaultValue={teamsvalue}
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
                                defaultValue={visionvalue}
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
                                defaultValue={propositionvalue}
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
                                defaultValue={productvalue}
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
                                defaultValue={marketvalue}
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
                                defaultValue={businessvalue}
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
                                defaultValue={investmentvalue}
                                marks={investment}
                                onChange={handleInvestmentOnChange}
                            />
                        </Stack>
                    </div>
                </FormStep>
            </MultipleStepForm>
            </div>
            <div className="description">
                <div className="description-header">
                    <h3>{teamsHeader}</h3>
                </div>
                <h5>{teamsDesc}</h5>
            </div>
        </div>
    )
}

export default Diagnostics

