import Link from "next/link";

function MyLink({ children, username, data }) {
  const path="/ip/" + data.img.split(".")[0] + "/" + data.id + "/" + username;
  return (
    <Link
      href={path}
    >
      {children}
    </Link>
  );
}

export default MyLink;
