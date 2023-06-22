import { FormikValues } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import svg from "../../../assets/images/spinner.svg";

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const FormNavigation = (props: Props) => {
  return (
    <div className="nav-btn">
      {props.hasPrevious && (
        <button type="button" onClick={props.onBackClick}>
          Back
        </button>
      )}
      {props.isLastStep ? null : (
        <button type="submit">{props.isLastStep ? "Submit" : "Next"}</button>
      )}
    </div>
  );
};

export default FormNavigation;
