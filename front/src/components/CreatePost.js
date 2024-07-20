import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });
  

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((res) => {
        console.log("worked");
    });
  };
  return (
    <div className="createPostPage">
      <Link to="/post">Post Page</Link>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span"/>
          <Field
            className="formContainer"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span"/>
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span"/>
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Name...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
