import Head from 'next/head';
import Link from 'next/link';

import { BasicLayout, Seo } from '../components';

const SignIn = (): JSX.Element => {
  return (
    <BasicLayout className="signin">
      <Head>
        <Seo title="Sign in" />
      </Head>

      <form className="mx-auto my-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            {"We'll never share your email with anyone else."}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
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
