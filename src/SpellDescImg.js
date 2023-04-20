import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SpellDescImg(props) {
  const [imageUrl, SetImageUrl] = useState({});
  const spell_name = props.name.toLowerCase();

  function handleResponse(response) {
    let spellUrl = `https://drive.google.com/uc?export=view&id=${response.data[0].drive_id}`;
    let url_dict = {};
    url_dict["image_url"] = spellUrl;

    SetImageUrl(url_dict);
  }

  useEffect(() => {
    let apiUrl = `/image_descs/${spell_name}`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }, [spell_name]);

  if (props.dropdown) {
    return (
      <img
        className="SpellDescImg"
        src={imageUrl["image_url"]}
        alt="spell-description"
        width={250}
      />
    );
  }
}
