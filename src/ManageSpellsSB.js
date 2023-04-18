import React from "react";

export default function ManageSpellsSB() {
  return (
    <div>
      <a
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        href="#offcanvasRight"
        role="button"
        aria-controls="offcanvasRight"
      >
        Toggle right offcanvas
      </a>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-title">
          <h5 id="offcanvasRightLabel">Offcanvas right</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">...</div>
      </div>
    </div>
  );
}
