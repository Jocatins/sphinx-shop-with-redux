import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  address: "",
};
const onSubmit = (values) => {
  console.log("form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Email required"),
  channel: Yup.string().required("Channel name required"),
});

function Form1() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name " name="name" />

          <ErrorMessage name="name" />
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
          <Field as="textarea" type="text" id="address " name="address" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
export default Form1;
