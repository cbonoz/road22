import React, { useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button, Modal, Input } from "antd";
import { getExplorerUrl } from "../util";

function Packet(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();

  const openUrl = (url) => window.open(url, "_blank");

  const { authorized, signerAddress, loading, sign, title, files } = props;

  if (!authorized) {
    return (
      <div className="centered">
        <p>
          You are not logged in with the expected user for this esignature
          contract.
          <br />
          <b className="error-text">
            Please log in with address: {signerAddress}
          </b>
        </p>

        <p>
          <a href="/">Return to home</a>
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>
        By continuing below, you agree to the included documents available for
        viewing/download below.
      </p>
      <div>{JSON.stringify(props, null, "\t")}</div>
      <div>
        <a href={getExplorerUrl(props.contractAddress)} target="_blank">
          View Contract
        </a>
      </div>

      <br />
      <h3>Documents to acknowledge: </h3>
      {files.map((f, i) => {
        return (
          <li key={i}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openUrl(f.url);
              }}
            >
              {f.name}
            </a>
          </li>
        );
      })}
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => setShowModal(true)}
        disabled={!authorized}
      >
        Accept Documents
      </Button>

      <Modal
        visible={showModal}
        title={`${title}: Sign and complete`}
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={sign}>
            Sign
          </Button>,
        ]}
      >
        <Input
          placeholder="Type name"
          value={name}
          prefix="Type name:"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <hr />
        <p>Draw signature:</p>
        <SignatureCanvas
          penColor="green"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
      </Modal>
    </div>
  );
}

export default Packet;
