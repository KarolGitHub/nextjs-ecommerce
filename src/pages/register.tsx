import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import { BasicLayout, Seo } from '../components';
import valid from '../utils/valid';

const initialState = { name: '', email: '', password: '', cf_password: '' };

const Register = (): JSX.Element => {
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errMsg = valid({ name, email, password, cf_password });
    console.log(
      '🚀 ~ file: register.tsx ~ line 22 ~ formSubmitHandler ~ errMsg',
      errMsg
    );
  };

  return (
    <BasicLayout className="signin">
      <Head>
        <Seo title="Register page" />
      </Head>

      <form className="mx-auto my-4" onSubmit={formSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="cf_password"
            value={cf_password}
            onChange={inputChangeHandler}
          />
        </div>
        <div id="help" className="form-text mb-2">
          {"We'll never share your credentials with anyone else."}
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>
        <p className="my-2">
          {'Already have an account?'}
          <Link href="/signin">
            <a className="text-danger "> Login Now</a>
          </Link>
        </p>
      </form>
    </BasicLayout>
  );
};

export default Register;
