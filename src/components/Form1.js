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
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
  },
  idNumbers: [""],
  phoneNumbers: ["", ""],
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
      // validateOnChange={false}   validateOnBlur={false}
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
          <FastField name="address">
            {(props) => {
              console.log("Field render");
              const { field, form, meta } = props;
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error} </div> : null}
                </div>
              );
            }}
          </FastField>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <Field type="text" id="facebook " name="social.facebook" />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <Field type="text" id="twitter " name="social.twitter" />
        </div>
        <div className="form-control">
          <label htmlFor="instagram">Instagram Profile</label>
          <Field type="text" id="instagram " name="social.instagram" />
        </div>
        <div className="form-control">
          <label htmlFor="primaryPhone">Primary Number</label>
          <Field type="text" id="primaryPhone " name="phoneNumbers[0]" />
        </div>
        <div className="form-control">
          <label htmlFor="secPhone">Secondary Number</label>
          <Field type="text" id="secPhone " name="phoneNumbers[1]" />
        </div>
        <div className="form-control">
          <label>List of Numbers</label>
          <FieldArray name="idNumbers">
            {(fieldProps) => {
              //console.log("field array props", fieldProps);
              const { push, remove, form } = fieldProps;
              const { values } = form;
              const { idNumbers } = values;
              return (
                <div>
                  {idNumbers.map((idNo, index) => (
                    <div key={index}>
                      <Field name={`idNumbers [${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          {""}- {""}
                        </button>
                      )}

                      <button type="button" onClick={() => push("")}>
                        {""} + {""}
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
export default Form1;
