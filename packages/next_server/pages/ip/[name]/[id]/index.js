import { useRouter } from "next/router";

function ID() {
  const router = useRouter();
  const { name, id } = router.query;

  return (
    <div>
      <h1>{name}</h1>
      <h1>{id}</h1>
    </div>
  );
}

export default ID;
