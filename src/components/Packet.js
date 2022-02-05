import React from "react";
import PropTypes from "prop-types";

function Packet(props) {
  return <div>{JSON.stringify(props)}</div>;
}

export default Packet;
