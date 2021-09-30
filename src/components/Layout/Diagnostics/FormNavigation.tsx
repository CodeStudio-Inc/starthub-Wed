import { FormikValues } from 'formik'
import React from 'react'

interface Props {
    hasPrevious?: boolean,
    onBackClick: (values: FormikValues) => void,
    isLastStep:boolean
}

const FormNavigation = (props: Props) => {
    return (
        <div>
            {props.hasPrevious && 
                <button onClick={props.onBackClick}>Back</button>
            }
            <button type='submit'>{props.isLastStep ? 'Submit' : 'Next'}</button>
        </div>
    )
}

export default FormNavigation