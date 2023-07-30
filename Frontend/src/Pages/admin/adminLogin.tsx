/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const Login: FC = () => {

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required'),

  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log("submitting");

        axiosInstance.post('/adminLogin', values).then((res) => {
          if (res.data.err) {
            toast.error(res.data.err)
          } else if (res.data.pass) {
            toast.error(res.data.err)
          } else {
            toast.success(res.data.success)
            setTimeout(() => {
              window.location.href = '/adminHome'
            }, 2000)
          }
        }).catch((err) => {
          console.log(err)
        })
      }}>

      {({ isSubmitting }) => (


        <div>
          <h1 className="text-3xl lg:text-5xl font-bold text-center mt-10 mobile:text-2xl">
            MATCH<span className="text-3xl lg:text-5xl font-bold text-center text-pink-700 mt-6 lg:mt-16 mobile:text-2xl">MAKER</span>
          </h1>
          <div className="container mobile:w-10/12 lg:w-8/12  xl:w-4/12 mx-auto px-4 mt-6 lg:mt-16 bg-pink-100 p-8 rounded-lg shadow-lg ">
            <h1 className="text-2xl lg:text-4xl font-semibold text-center text-pink-700 underline decoration-solid uppercase">
             Admin Login
            </h1>
            <Form className="flex flex-col items-center">

              <div className="mb-6 w-4/5">
                <label htmlFor="email" className="block text-base lg:text-lg font-medium text-gray-800 mb-2">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="mb-6 w-4/5">
                <label htmlFor="password" className="block text-base lg:text-lg font-medium text-gray-800 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2 mt-5">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full lg:px-1 py-2 mobile:text-sm text-lg lg:text-xl font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-lg hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

    </Formik>
  );
};

export default Login;
