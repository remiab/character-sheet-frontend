import React from "react";

export default function SpellSlot(props) {
  console.log(props);
  return <input type="checkbox" id={props.id} className="px-1"></input>;
}
