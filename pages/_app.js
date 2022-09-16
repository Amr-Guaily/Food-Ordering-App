import Layout from '@layout/Layout';
import 'styles/globals.css';
import { CartProvidor } from 'context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvidor>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvidor>
  );
}

export default MyApp;
