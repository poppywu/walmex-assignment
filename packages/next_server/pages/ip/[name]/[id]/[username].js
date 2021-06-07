import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../../../../next_server/apollo-client";
import Product from "../../../../components/Product";
import Carousel from '../../../../components/Carousel';
const GET_ITEM = gql`
  query ItemDetail($id: ID!) {
    item(id: $id) {
      name
      img
      department
      category
      weight
      packagedWeight
    }
  }
`;

const GET_USER = gql`
  query UserDetail($username: String!) {
    usersRecommendedItems(username: $username) {
      id
      img
      name
      price
    }
  }
`;
export default function Username() {
  const router = useRouter();
  const { name, id, username } = router.query;
  return <Detail id={id} username={username} />;
}

function Detail({id, username }) {
  const [itemData, setItemData] = useState({});
  const [recomData, setRecomData] = useState([]);
  useEffect(() => {
    client.query({ query: GET_ITEM, variables: { id } }).then((res) => {
        setItemData(res.data.item);
      });
      client.query({ query: GET_USER, variables: { username } }).then((res) => {
        setRecomData(res.data.usersRecommendedItems);
      });
    
  }, []);
  return (
    <>
      <Product
        name={itemData.name}
        img={itemData.img}
        department={itemData.department}
        category={itemData.category}
        weight={itemData.weight?itemData.weight:itemData.packagedWeight}
      />
      <Carousel recomData={recomData} username={username}/>
    </>
  );
}
