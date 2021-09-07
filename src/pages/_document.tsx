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

const bootstrapCSS = (
  <link
    key="bootstrapCSS"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossOrigin="anonymous"
  />
);

const PopperJS = (
  <script
    key="PopperJS"
    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"
    defer
    integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp"
    crossOrigin="anonymous"></script>
);

const bootstrapJS = (
  <script
    key="bootstrapJS"
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js"
    defer
    integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/"
    crossOrigin="anonymous"></script>
);

const fontAwesomeScript = (
  <script
    key="fontAwesomeScript"
    defer
    src="https://kit.fontawesome.com/a076d05399.js"
  />
);
const PaypalUrlScript = (
  <script
    key="PaypalUrlScript"
    defer
    src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
);

const mergedLinks = [
  OG_TitleMetaLink,
  OG_DescriptionMetaLink,
  OG_URLMetaLink,
  OG_TypeMetaLink,
  TwitterTitleMetaLink,
  TwitterDescriptionMetaLink,
  TwitterCardMetaLink,
  bootstrapCSS,
  PopperJS,
  bootstrapJS,
  fontAwesomeScript,
  PaypalUrlScript,
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
