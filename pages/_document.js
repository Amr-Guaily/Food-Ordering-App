import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        {/* Portal */}
        <div id="portal"></div>
        <NextScript />
      </body>
    </Html>
  );
}
