import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import Packet from "./Packet";
// import { getPacket, signPacket } from "../util/packet";
import { useParams } from "react-router-dom";
import { createSignatureNFT } from "../util/nftport";
import { ACTIVE_CHAIN_ID, CHAIN_OPTIONS } from "../util/constants";
import logo from "../assets/logo.png";

function Sign({ match }) {
  const { signId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", signId);
    if (!signId) {
      return;
    }

    setLoading(true);
    try {
      const res = {}; //await getPacket(signId);
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

  const sign = async (signData, useCC) => {
    let res;
    const nftResults = {};
    const { buyerAddress } = signData;

    if (useCC) {
      // Credit card
      setLoading(true);
      try {
        res = {}; // await signPacket(buyerAddress, useCC);
        nftResults["esignature"] = res;
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else if (!signData.stream) {
      // If crypto method, but not using signstream.
      const config = {
        pessimistic: true,
        locks: {
          "0x43090E9e8ec709811C777ffa03111Bd1Bb0ca65c": {
            network: 4,
            name: data.properties.title,
          },
        },
        icon: "https://i.ibb.co/YR4nzVS/favicon.png",
        // icon: "https://i.ibb.co/ZdR7Rm6/Screen-Shot-2022-01-15-at-11-45-39-PM.png",
        callToAction: {
          default: `${data.properties.title}. ${data.description}. Complete esignature for this esignature request below:`,
        },
        metadataInputs: [
          {
            name: "Address for NFT receipt",
            type: "text",
            required: true,
          },
          {
            name: "Additional notes",
            type: "text",
            required: false,
          },
        ],
      };
      window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(config);
      // TODO: nft issue
      return;
    }
    setLoading(true);

    const chain = CHAIN_OPTIONS[data.chainId] || ACTIVE_CHAIN_ID;

    const { destination, description, title } = data.properties;

    try {
      // TODO: add esignature rollback if NFT mint fails.
      nftResults["buyer"] = await createSignatureNFT(
        chain,
        title,
        description,
        data,
        buyerAddress
      );
      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      nftResults["issuer"] = await createSignatureNFT(
        chain,
        title,
        description,
        data,
        destination
      );
      setResult(nftResults);
    } catch (e) {
      console.error(e);
      alert(
        "Error issuing NFT: " + e.toString() + ". Please retry esignature."
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
      <div>
        <img src={logo} className="header-logo" />
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>
          Both you and the issuer received NFT's in your respective wallet
          addresses.
        </p>
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  return (
    <div>
      <Packet {...data} {...data.properties} sign={sign} signId={signId} />
    </div>
  );
}

Sign.propTypes = {};

export default Sign;
