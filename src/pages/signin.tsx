import Head from 'next/head';

import { BasicLayout, Seo } from '../components';

const SignIn = (): JSX.Element => {
  return (
    <BasicLayout>
      <Head>
        <Seo title="Sign in" />
        <h1>Sign in</h1>
      </Head>
    </BasicLayout>
  );
};

export default SignIn;
