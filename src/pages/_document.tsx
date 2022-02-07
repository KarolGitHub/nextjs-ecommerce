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
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossOrigin="anonymous"></link>
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
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"
    defer
    integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/"
    crossOrigin="anonymous"></script>
);

const fontAwesomeScript = (
  <link
    key="fontAwesomeScript"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.0/css/all.css"
    rel="stylesheet"
    crossOrigin="anonymous"
  />
);
const PaypalUrlScript = (
  <script
    key="PaypalUrlScript"
    defer
    src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=EUR`}
  />
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
