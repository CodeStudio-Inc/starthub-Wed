import { FormikValues } from 'formik'
import React from 'react'

interface Props {
    hasPrevious?: boolean,
    onBackClick: (values: FormikValues) => void,
    isLastStep:boolean
}

const FormNavigation = (props: Props) => {
    return (
        <div className="nav-btn">
            {props.hasPrevious && 
                <button type="button" onClick={props.onBackClick}>Back</button>
            }
            <button type='submit'>{props.isLastStep ? 'Submit' : 'Next'}</button>
        </div>
    )
}

export default FormNavigation