import React from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import StepFive from './StepFive'
import {Formik, Form} from 'formik'
import './Diagnostics.css'
 const Diagnostics = () => {

    return (
        <div className="main">
            <h2>Business Diagnostics</h2>
            <Formik
                initialValues={{
                    name:'Hello world',
                    date:'30/09/2021'
                }}
                onSubmit={values => {
                    alert(JSON.stringify(values))
                }}
            >
                {(formik)=> (
                    <Form>
                        <input type="radio" value={formik.values.name} onChange={formik.handleChange}/>
                        <input type="radio" value={formik.values.date} onChange={formik.handleChange}/>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Diagnostics

