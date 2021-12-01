import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "Jocatins",
  email: "",
  channel: "",
  address: "",
  comments: "",
};
const savedValues = {
  name: "Jocatins",
  email: "jocakhamen@gmail.com",
  channel: "sphinx tv",
  address: "Panorama",
  comments: "Good to you",
};
const onSubmit = (values, onSubmitProps) => {
  console.log("form data", values);
  console.log("submit props", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  //onSubmitProps.resetForm()
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Email required"),
  channel: Yup.string().required("Channel name required"),
});
//field level validation
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Comments required";
  }
  return error;
};

function Form1() {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnChange={false}   validateOnBlur={false}
      // 4 simple validations use -----> validateOnMount
    >
      {(formik) => {
        console.log("formik props", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name " name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email " name="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel "
                name="channel"
                placeholder="Channel Name"
              />
              <ErrorMessage name="channel">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  console.log("Field render", props);
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error} </div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            {/* Field level validation */}
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                type="text"
                id="comments "
                name="comments"
                validate={validateComments}
              />

              <ErrorMessage name="comments" component={TextError} />
            </div>
            <button type="reset">Reset</button>
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Saved Data
            </button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
export default Form1;
