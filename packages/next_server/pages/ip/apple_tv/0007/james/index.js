import client from "../../../../../apollo-client";
import { gql } from "@apollo/client";
import Product from "../../../../../components/Product";
import Link from "next/link";
//server-side rendering for first time loading
export const getServerSideProps = async () => {
  const { data: productData } = await client.query({
    query: gql`
      {
        item(id: "0007") {
          name
          img
          department
          category
          weight
        }
      }
    `,
  });
  const { data: recomData } = await client.query({
    query: gql`
      {
        usersRecommendedItems(username: "james") {
          id
          img
          name
          price
        }
      }
    `,
  });

  return {
    props: { product: productData.item, recom: recomData.usersRecommendedItems },
  };
};
export default function Home({ product, recom }) {
  const { name, img, department, category, weight } = product;


  return (
    <div className="container">
      <Product
        name={name}
        img={img}
        department={department}
        category={category}
        weight={weight}
      />
      {recom.map((item) => {
        return (
          <Link href={`/ip/${item.img.split(".")[0]}/${item.id}/james`}>
            <div key={item.id}>{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
