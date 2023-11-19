import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function ForgotPassword() {
  let navigate = useNavigate();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");
  let handleSubmit = async (data) => {
    try {
      let result = await axios.post(`${url}/reset-email-verify`, data);
      setMessages(result.data.message);
      setActiveResponse(true);
      if (result.data.statusCode === 200) {
        setColor("green");
        setTimeout(() => {
          navigate(`/verification/otp/email/${data.email}`);
        }, "3000");
      }

      if (result.data.statusCode === 404) {
        setTimeout(() => {
          navigate("/sign-up");
        }, "3000");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div className="form">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <br />
          <h2>Reset Passowrd</h2>
          <h6>Verify Email</h6>
          <br />
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          {ActiveResponse ? (
            <div style={{ color: isColor }}>{Messages}</div>
          ) : null}
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
          OR
          <div>
            <a href="/sign-up" className="sign-container">
              Create New Account
            </a>
          </div>
          <div>
            <p>
              Bact to{" "}
              <a href="/login" className="sign-container">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
