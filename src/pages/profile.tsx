import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { BasicLayout } from '../components';
import { useGlobalState } from '../context/GlobalState';
import valid from '../utils/valid';
import { patchData } from '../utils/fetchData';

const Profile: React.FC = () => {
  const initialSate = {
    avatar: '',
    name: '',
    password: '',
    confirmPassword: '',
  };

  const [data, setData] = useState(initialSate);
  const { avatar, name, password, confirmPassword } = data;

  const { state, dispatch } = useGlobalState();
  const { auth, notify } = state;
  const { user } = auth || {
    user: { name: '', email: '', role: '', avatar: '', root: '' },
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const updatePassword = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    patchData('user/resetPassword', password, auth?.token).then((res) => {
      if (res.err) {
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
      }
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    });
  };

  const updateProfileHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid({
        name,
        email: user.email,
        password,
        confirmPassword,
      });

      if (errMsg) {
        return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
      }

      updatePassword();
    }
  };

  useEffect(() => {
    if (user) {
      setData({ ...data, name: user.name });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <BasicLayout className="profile-page">
      <Head>
        <title>Profile Page</title>
      </Head>
      {user && (
        <section className="row text-secondary my-3">
          <div className="col-md-4">
            <h3 className="text-center text-uppercase">User Profile</h3>

            <div className="avatar">
              <img src={user.avatar} alt="avatar" />

              <span>
                <i className="fas fa-camera" aria-hidden />
                <p>Change</p>
                <input type="file" name="file" id="file-up" accept="image/*" />
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                className="form-control"
                placeholder="Name"
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                defaultValue={user.email}
                className="form-control"
                placeholder="Email address"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>

            <button
              className="btn btn-info mt-3"
              onClick={updateProfileHandler}
              disabled={notify.loading}>
              Update
            </button>
          </div>
        </section>
      )}
    </BasicLayout>
  );
};

export default Profile;
