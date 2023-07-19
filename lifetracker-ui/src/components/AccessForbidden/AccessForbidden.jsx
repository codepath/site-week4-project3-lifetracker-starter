import React, { Fragment } from "react";
import "./AccessForbidden.css";

export default function AccessForbidden() {
  return (
    <Fragment>
      <div id="accessForbidden">
        <h1>Access Forbidden! 🛑</h1>
        <img
          src="https://t4.ftcdn.net/jpg/03/77/78/17/360_F_377781792_j2jOYENO4CDuw9Y6rmioE1yfE1X5L3sv.jpg"
          alt="image of access denied"
        />
      </div>
    </Fragment>
  );
}
