import React from "react";
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
  name: "",
  email: "",
  channel: "",
  address: "",
  comments: "",
};
const onSubmit = (values, onSubmitProps) => {
  console.log("form data", values);
  console.log("submit props", onSubmitProps);
  onSubmitProps.setSubmitting(false);
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
              <Field type="text" id="channel " name="channel" />
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

            {/* <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </button> */}
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
