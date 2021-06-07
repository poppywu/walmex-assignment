import client from "../../../apollo-client";
import { gql } from "@apollo/client";
import Product from "../../../components/Product";
import Carousel from "../../../components/Carousel";
//server-side rendering for first time loading
export const getServerSideProps = async () => {
  const { data} = await client.query({
    query: gql`
      {
        item(id: "0007") {
          name
          img
          department
          category
          weight
        }
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
    props: {
      product: data.item,
      recom: data.usersRecommendedItems,
    },
  };
};
export default function Home({ product, recom }) {
  const { name, img, department, category, weight } = product;
  const username = "james";

  return (
    <div className="container">
      <Product
        name={name}
        img={img}
        department={department}
        category={category}
        weight={weight}
      />
      <Carousel recomData={recom} username={username} />
    </div>
  );
}
