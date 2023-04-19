import React from "react";
// import axios from "axios";

export default function SpellDescImg(props) {
  let drive_url = props.imageURL;
  return (
    <img
      className="SpellDescImg"
      src={drive_url}
      alt="spell-description"
      width={250}
    />
  );
}
