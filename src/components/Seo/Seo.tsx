import React from 'react';

type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const Seo: React.FC<Props> = ({
  title = 'E-commerce Storefront',
  description = 'E-commerce Storefront build in Next.js',
  children,
}): JSX.Element => {
  return (
    <React.Fragment>
      <title>{title}</title>
      <link key="icon" rel="icon" href="/favicon.ico" />
      <meta property="description" content={description} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
        key="viewport-meta"
      />
      {children}
    </React.Fragment>
  );
};

export default Seo;
