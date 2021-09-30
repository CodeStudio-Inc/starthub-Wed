import React,{useState} from 'react'
import {FormikConfig, FormikValues, Formik, FormikHelpers, Form} from 'formik'
import FormNavigation from './FormNavigation'

interface Props extends FormikConfig<FormikValues> {
    children: React.ReactNode
}

const MultipleStepForm = ({children, initialValues, onSubmit}: Props) => {

    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children) as React.ReactElement[]

    const [snapshot, setSnapshot] = useState(initialValues)

    const step = steps[stepNumber]
    const totalSteps = steps.length
    const isLastStep = stepNumber === totalSteps - 1

    const next = (values: FormikValues) => {
    setStepNumber(stepNumber + 1)
    setSnapshot(values)
    }

    const previous = (values: FormikValues) => {
        setStepNumber(stepNumber - 1)
        setSnapshot(values)
    }

    const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        
        if(step.props.onSubmit) {
            await step.props.onSubmit(values)
        }

        if(isLastStep){
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }

    }

    return (
        <div>
            <Formik
                initialValues={snapshot}
                onSubmit={handleSubmit}
            >
                {(formik) => 
                    <Form>
                        {step}
                        <FormNavigation 
                        isLastStep={isLastStep} 
                        hasPrevious={stepNumber > 0} 
                        onBackClick={() => previous(formik.values)}
                        />
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default MultipleStepForm

export const FormStep = ({stepName = '', children}: any ) => children