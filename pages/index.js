import { Featured, PizzaGrid } from 'components/index';
import dbConnect from 'lib/mongo';
import Product from 'models/Product';

export default function Home({ products }) {
  return (
    <>
      <Featured />
      <PizzaGrid products={products} />
    </>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  await dbConnect();
  /**
   * ! You should not use fetch() to call an API routes in getServerProps()" - Why?
   * That's because getServerSideProps() runs on the server just like API routes,
   * So making a request from the server to the server would be pioint less..
   * ? I cant't convert mongoose Doc to plain js obj !?
   */
  const docs = await Product.find({}, { __v: 0 }, { lean: true });
  const products = docs.map((itm) => ({
    ...itm,
    extraOptions: itm.extraOptions.map((opt) =>
      JSON.parse(JSON.stringify(opt))
    ),
  }));

  return {
    props: {
      products,
    },
  };
}
