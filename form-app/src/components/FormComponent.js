import React, { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "shards-react";
import { Form, Field, withFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const FormComponent = props => {
  const [items, setItems] = useState([]);
  const { touched, errors, status, handleSubmit, values } = props;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/restricted/data")
      .then(res => {
        setItems(res.data);
      })
      .catch(error => console.log(error));
  }, []);

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
      <div id="card-container">
        {items.map(item => (
          <ListGroup>
            <ListGroupItem>{item.name}</ListGroupItem>
          </ListGroup>
        ))}
      </div>
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
        console.log(res, "post res");
      })
      .catch(error => {
        console.log(error.response);
      });
  }
})(FormComponent);

export default FormikFormComponent;
