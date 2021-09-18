import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  user: {};
};

export const AuthCheck: React.FC<Props> = ({ children, user }) => {
  const router = useRouter();

  if (typeof window !== 'undefined' && !Object.keys(user).length) {
    router.push('/signin');
  }

  return <>{children}</>;
};
