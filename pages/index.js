import { Featured, PizzaGrid } from 'components/index';

export default function Home({ products }) {
  return (
    <>
      <Featured />
      <PizzaGrid products={products} />
    </>
  );
}

export async function getServerSideProps() {
  /**
   * ! You should not use fetch() to call an API routes in getServerProps()" - Why?
   * That's because getServerSideProps() runs on the server just like API routes,
   * So making a request from the server to the server would be pioint less..
   * TODO: You can use the logic that's in your API route directly in getServerSideProps()..
   * ? I cant do that, because i cant't convert mongoose Doc to plain js obj !?
   */
  const docs = fetch('http://localhost:3000/api/products').then((res) =>
    res.json()
  );

  return {
    props: {
      products: await docs,
    },
  };
}
