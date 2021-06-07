import Link from "next/link";
import React from "react";

function MyLink({ children, username, data }) {
  return (
    <Link
      href={"/ip/" + data.img.split(".")[0] + "/" + data.id + "/" + username}
    >
      {children}
    </Link>
  );
}

export default MyLink;
