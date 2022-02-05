import React, { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import Packet from "./Packet";
// import { getPacket, signPacket } from "../util/packet";
import { useParams } from "react-router-dom";
import { createSignatureNFT } from "../util/nftport";
import { ACTIVE_CHAIN_ID, CHAIN_OPTIONS } from "../util/constants";
import logo from "../assets/logo.png";
import { fetchIPFSDoc } from "../util/stor";
import { markContractCompleted } from "../contract/polysignContract";

function Sign({ match }) {
  const { signId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState();
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", signId);
    if (!signId) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetchIPFSDoc(signId);
      setData(res.data);
      console.log("esignature request", res.data);
    } catch (e) {
      console.error(e);
      alert("error getting signdata" + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [signId]);

  // TODO: implement authorization
  const authorized = useMemo(
    () => data.signerAddress !== currentAddress,
    [data]
  );

  const sign = async () => {
    let nftResults = {};

    setLoading(true);

    const chain = CHAIN_OPTIONS[data.chainId] || ACTIVE_CHAIN_ID;

    const { description, title, signerAddress } = data;

    try {
      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      nftResults["signatureNft"] = await createSignatureNFT(
        chain,
        title,
        description,
        data,
        signerAddress
      );

      const url = nftResults["transaction_external_url"];
      const res = await markContractCompleted(data.address, url);
      nftResults = { ...res, nftResults };
      setResult(nftResults);
    } catch (e) {
      console.error("error signing", e);
      alert(
        "Error completing esignature: " +
          e.toString() +
          ". Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />
      </div>
    );
  }

  if (result) {
    return (
      <div className="container">
        <img src={logo} className="header-logo" />
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>Access your completed polygon contract and signature packet.</p>
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  return (
    <div className="container boxed white">
      <h2 className="centered">Sign Documents</h2>
      <br />
      <Packet authorized={authorized} {...data} sign={sign} signId={signId} />
    </div>
  );
}

Sign.propTypes = {};

export default Sign;
