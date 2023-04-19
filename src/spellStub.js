import React, { useState } from "react";
import PrepareBtn from "./PrepareBtn";
import SpellDescImg from "./SpellDescImg";
import axios from "axios";

export default function SpellStub(props) {
  const [dropdown, SetDropdown] = useState(false);
  const [imageUrl, SetImageUrl] = useState({});

  function DropDownSpellDesc() {
    SetDropdown(!dropdown);

    function handleResponse(response) {
      let drive_id = response.data[0].drive_id;
      let spellUrl = `https://drive.google.com/uc?export=view&id=${drive_id}`;
      let url_dict = {};
      url_dict["image_url"] = spellUrl;

      SetImageUrl(url_dict);
      console.log(spellUrl);
    }

    let spell_name = props.spell_name.toLowerCase();
    let apiUrl = `/image_descs/${spell_name}`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }

  return (
    <div className="SpellStub">
      <div className="spell_pill row d-flex justify-content-between align-items-center">
        <div className="col-sm-8">
          <span
            className="spell-display d-flex"
            id="spell_name"
            onClick={DropDownSpellDesc}
          >
            {props.spell_name}
          </span>
        </div>
        <div className="col-sm-4 btn-container">
          <PrepareBtn name={props.spell_name} status={props.status} />
        </div>
      </div>
      <div
        className={
          dropdown
            ? "desc-dropdown desc-dropdown-active d-block"
            : "desc-dropdown desc-dropdown-hidden d-none"
        }
      >
        <SpellDescImg imageURL={imageUrl["image_url"]} />
      </div>
    </div>
  );
}
