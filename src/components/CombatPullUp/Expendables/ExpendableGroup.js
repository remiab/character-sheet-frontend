import React from "react";

export default function ExpendableGroup(props) {
  console.log(props.group);

  return <div>{props.group[0]}</div>;
}
