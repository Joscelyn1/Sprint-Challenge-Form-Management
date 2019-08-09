import React, { useEffect, useState } from "react";
import { Button } from "shards-react";
import { Form, Field, withFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const FormComponent = props => {
  const [users, setUsers] = useState([]);
  const { touched, errors, status, handleSubmit, values } = props;
  useEffect(() => {
    if (status) {
      setUsers(...users, [status]);
      console.log(users, "users");
      console.log("hello");
    }
  }, [status]);

  return (
    <div>
      <Form>
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <label>
          Enter UserName
          <Field type="text" name="username" placeholder="name" />
        </label>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label>
          Enter Password
          <Field type="password" name="password" placeholder="password" />
        </label>
        <Button theme="primary" type="submit">
          Submit
        </Button>
      </Form>
      {users.map(user => (
        <p key={user}>{user}</p>
      ))}
    </div>
  );
};

const FormikFormComponent = withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: yup.object().shape({
    username: yup.string().required(),
    password: yup
      .string()
      .min(6, "Your password must have at least six characters")
      .required()
  }),
  handleSubmit: (values, { setStatus }) => {
    axios
      .post("http://localhost:5000/api/register", values)
      .then(res => {
        console.log(res.config.data, "res");
        setStatus(res.config.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
})(FormComponent);

export default FormikFormComponent;
