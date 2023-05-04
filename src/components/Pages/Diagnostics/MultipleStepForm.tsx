import React, { useState } from "react";
import {
  FormikConfig,
  FormikValues,
  Formik,
  FormikHelpers,
  Form,
} from "formik";
import FormNavigation from "./FormNavigation";
import Stepper from "@mui/material/Stepper";
import StepButton from "@mui/material/StepButton";
import Step from "@mui/material/Step";

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultipleStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement[];

  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setStepNumber(stepNumber + 1);
    setSnapshot(values);
  };

  const previous = (values: FormikValues) => {
    setStepNumber(stepNumber - 1);
    setSnapshot(values);
  };

  const handleStep = (step: number) => () => {
    setStepNumber(step);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }

    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  //   console.log(snapshot);

  return (
    <div>
      <Formik initialValues={snapshot} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber} alternativeLabel>
              {steps.map((currentStep, index) => {
                const label = currentStep.props.stepName;

                return (
                  <Step key={label}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
            {step}
            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultipleStepForm;

export const FormStep = ({ stepName = "", children }: any) => children;
