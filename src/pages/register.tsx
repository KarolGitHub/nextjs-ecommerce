import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

import { BasicLayout } from '../components';
import { useGlobalState } from '../context/GlobalState';
import valid from '../utils/valid';
import { postData } from '../utils/fetchData';

const initialState: RegisterPayload = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register: React.FC = () => {
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, confirmPassword } = userData;

  const router = useRouter();

  const { state, dispatch } = useGlobalState();
  const { auth } = state;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errMsg = valid({ name, email, password, confirmPassword });

    if (errMsg) {
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('auth/register', userData);

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      router.push('/');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <BasicLayout className="signin-page">
      <Head>
        <title>Register Page</title>
      </Head>

      <form
        className="credentials-form mx-auto my-4"
        onSubmit={formSubmitHandler}>
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
            name="confirmPassword"
            value={confirmPassword}
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
