import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { BasicLayout } from '../components';
import { useGlobalState } from '../context/GlobalState';
import valid from '../utils/valid';
import { patchData } from '../utils/fetchData';
import { AuthCheck } from '../components/AuthCheck/AuthCheck';
import Spinner from '../components/UI/Spinner';

const Profile: React.FC = () => {
  const initialSate = {
    avatar: '' as any,
    name: '',
    password: '',
    confirmPassword: '',
  };

  const [data, setData] = useState(initialSate);
  const { avatar, name, password, confirmPassword } = data;

  const { state, dispatch } = useGlobalState();

  const { auth, notify, orders } = state;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const avatarChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'File does not exist' },
      });
    } else if (file.size > 1024 * 1024) {
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'The largest image size is 1MB' },
      });
    }
    setData({ ...data, avatar: file });
  };

  const updatePassword = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    patchData('user/resetPassword', password, auth.token).then((res) => {
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
        email: auth.user.email + '',
        password,
        confirmPassword,
      });

      if (errMsg) {
        return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
      }
      updatePassword();
    }
    if (name !== auth.user.name || avatar) {
      updateNameOrAvatar();
    }
  };

  const updateNameOrAvatar = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const reader = new FileReader();

    reader.readAsDataURL(avatar);

    reader.onload = async function () {
      patchData(
        'user',
        {
          name,
          avatar: avatar ? reader.result : auth.user.avatar,
        },
        auth.token
      ).then((res) => {
        if (res.err) {
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
        }

        dispatch({
          type: 'AUTH',
          payload: {
            token: auth.token,
            user: res.user,
          },
        });

        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
      });
    };
  };

  useEffect(() => {
    if (auth.token && Object.keys(auth.user).length) {
      setData({ ...data, name: auth.user.name + '' });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <BasicLayout className="profile-page">
      <Head>
        <title>Profile Page</title>
      </Head>

      <AuthCheck user={auth.user}>
        {Object.keys(auth.user).length ? (
          <section className="row text-secondary my-3">
            <div className="col-md-4">
              <h3 className="text-center text-uppercase">User Profile</h3>

              <div className="avatar">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                  alt="avatar"
                />

                <span>
                  <i className="fas fa-camera" aria-hidden />
                  <p>Change - max size is 1024x512px / 1MB</p>
                  <input
                    type="file"
                    name="file"
                    id="file-up"
                    accept="image/*"
                    onChange={avatarChangeHandler}
                  />
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
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
                  defaultValue={auth.user.email}
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

            <div className="col-md-8">
              <h3 className="text-uppercase">Orders</h3>

              <div className="my-3 table-responsive">
                <table
                  className="table-bordered table-hover w-100 text-uppercase"
                  style={{ minWidth: '600px', cursor: 'pointer' }}>
                  <thead className="bg-light fw-bold">
                    <tr>
                      <td className="p-2">id</td>
                      <td className="p-2">date</td>
                      <td className="p-2">total</td>
                      <td className="p-2">delivered</td>
                      <td className="p-2">paid</td>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="p-2">
                          <Link href={`/order/${order._id}`}>
                            <a>{order._id}</a>
                          </Link>
                        </td>

                        <td className="p-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-2">€{order.totalPrice}</td>

                        <td className="p-2">
                          {order.delivered ? (
                            <i className="fas fa-check text-success"></i>
                          ) : (
                            <i className="fas fa-times text-danger"></i>
                          )}
                        </td>

                        <td className="p-2">
                          {order.paid ? (
                            <i className="fas fa-check text-success"></i>
                          ) : (
                            <i className="fas fa-times text-danger"></i>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <Spinner />
        )}
      </AuthCheck>
    </BasicLayout>
  );
};

export default Profile;
