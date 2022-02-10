import React, { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import Packet from "./Packet";
import { useParams } from "react-router-dom";
import { createSignatureNFT, getMintedNFT } from "../util/nftport";
import { fetchIPFSDoc } from "../util/stor";
import { getExplorerUrl, ipfsUrl } from "../util";
import {
  getPrimaryAccount,
  markContractCompleted,
} from "../contract/polysignContract";

function Sign({ match }) {
  const { signId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState();
  const [result, setResult] = useState();
  const [authed, setAuthed] = useState(false);

  const fetchData = async () => {
    console.log("fetch", signId);
    if (!signId) {
      return;
    }

    setLoading(true);
    try {
      const acc = await getPrimaryAccount();
      setAuthed(!!acc);
    } catch (e) {}
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

  const { description, title, signerAddress, contractAddress } = data;

  const sign = async (signatureData) => {
    let nftResults = {};

    setLoading(true);

    try {
      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      let res = await createSignatureNFT(
        title,
        description,
        signerAddress,
        signatureData
      );
      nftResults["signatureNft"] = res.data;
      const url = nftResults["transaction_external_url"];
      res = await markContractCompleted(contractAddress, url || signId);
      nftResults = { nftResults, ...res };
      try {
        res = await getMintedNFT(res["hash"]);
        nftResults = { nftResults, ...res };
      } catch (e) {
        // soft error for token id fetch.
        console.error(e);
      }
      setResult(nftResults);
    } catch (e) {
      console.error("error signing", e);
      alert("Error completing esignature: " + JSON.stringify(e));
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
        {/* <img src={logo} className="header-logo" /> */}
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>Access your completed polygon contract and signature packet.</p>

        <a href={getExplorerUrl(contractAddress)} target="_blank">
          View Contract
        </a>
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  return (
    <div className="container boxed white">
      <h2 className="centered">Sign Documents</h2>
      <br />
      <Packet {...data} authed={authed} sign={sign} signId={signId} />
    </div>
  );
}

Sign.propTypes = {};

export default Sign;
