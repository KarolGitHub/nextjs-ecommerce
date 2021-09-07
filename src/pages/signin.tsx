import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Cookie from 'js-cookie';

import { BasicLayout } from '../components';
import { useGlobalState } from '../context/GlobalState';
import { postData } from '../utils/fetchData';

const initialState: LoginPayload = {
  email: '',
  password: '',
};

const SignIn: React.FC = () => {
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const router = useRouter();

  const { state, dispatch } = useGlobalState();
  const { auth } = state;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('auth/signin', userData);

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.accessToken,
        user: res.user,
      },
    });

    Cookie.set('refreshToken', res.refreshToken, {
      path: 'api/auth/accessToken',
      expires: 7,
    });

    localStorage.setItem('firstLogin', 'true');
  };

  useEffect(() => {
    if (auth && Object.keys(auth).length !== 0) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <BasicLayout className="signin">
      <Head>
        <title>Sign In Page</title>
      </Head>

      <form className="mx-auto my-4" onSubmit={formSubmitHandler}>
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

        <div id="help" className="form-text mb-2">
          {"We'll never share your credentials with anyone else."}
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>

        <p className="my-2">
          {"You don't have an account?"}
          <Link href="/register">
            <a className="text-danger "> Register Now</a>
          </Link>
        </p>
      </form>
    </BasicLayout>
  );
};

export default SignIn;
