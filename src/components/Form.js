import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  console.log("form data", values);
};
const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }
  if (!values.channel) {
    errors.channel = "channel is required";
  }

  return errors;
};
// const validationSchema = Yup.object({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Invalid email format").required("Email required"),
//   channel: Yup.string().required("Channel name required"),
// });

function Form() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validationSchema,
    validate,
  });
  // console.log("form values", formik.errors);
  console.log("Visited fields", formik.touched);
  return (
    <div className="form-control">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name "
            name="name"
            {...formik.getFieldProps("name")}
          />
          <br />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name} </div>
          ) : null}
        </div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email "
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <br />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email} </div>
        ) : null}
        <label htmlFor="name">Channel</label>
        <input
          type="text"
          id="channel "
          name="channel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
        />
        <br />
        {formik.touched.channel && formik.errors.channel ? (
          <div className="error">{formik.errors.channel} </div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Form;
