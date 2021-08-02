import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

import { Seo } from '../components';

const OG_TitleMetaLink = (
  <meta key="og:title" property="og:title" content="Next.js storefront" />
);

const OG_DescriptionMetaLink = (
  <meta
    key="og:description"
    property="og:description"
    content="Next.js Storefront"
  />
);

const OG_URLMetaLink = (
  <meta
    key="og:url"
    property="og:url"
    content="https://github.com/KarolGitHub/nextjs-ecommerce"
  />
);

const OG_TypeMetaLink = (
  <meta key="og:type" property="og:type" content="website" />
);

const TwitterTitleMetaLink = (
  <meta
    key="twitter:title"
    property="twitter:title"
    content="Next.js Storefront"
  />
);

const TwitterDescriptionMetaLink = (
  <meta
    key="twitter:description"
    property="twitter:description"
    content="Next.js Storefront"
  />
);

const TwitterCardMetaLink = (
  <meta key="twitter:card" property="twitter:card" content="summary" />
);

const bootstrapLink = (
  <link
    key="bootstrapLink"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossOrigin="anonymous"></link>
);

const bootstrapScript = (
  <script
    key="bootstrapScript"
    defer
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossOrigin="anonymous"></script>
);
const fontAwesomeScript = (
  <script
    key="fontAwesomeScript"
    defer
    src="https://kit.fontawesome.com/a076d05399.js"></script>
);

const mergedLinks = [
  OG_TitleMetaLink,
  OG_DescriptionMetaLink,
  OG_URLMetaLink,
  OG_TypeMetaLink,
  TwitterTitleMetaLink,
  TwitterDescriptionMetaLink,
  TwitterCardMetaLink,
  bootstrapLink,
  bootstrapScript,
  fontAwesomeScript,
];

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <Seo>{mergedLinks}</Seo>
        </Head>
        <body
          className={
            process.env.NODE_ENV === 'production' ? 'debug-screens' : ''
          }>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
