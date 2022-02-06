import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { signatureUrl, ipfsUrl, getExplorerUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { ethers } from "ethers";
import { uploadFiles } from "../util/stor";
import { deployContract, validAddress } from "../contract/polysignContract";

const { Step } = Steps;

function CreatePolysign(props) {
  const [data, setData] = useState({ ...EXAMPLE_FORM });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const isValid = (data) => {
    return (
      data.title &&
      data.description &&
      data.files.length > 0 &&
      validAddress(data.signerAddress)
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError(
        "Please provide a title, description, valid address, and at least one file."
      );
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = body.files.map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      const contract = await deployContract(data.title, data.signerAddress);
      res["contract"] = contract;

      // 2) Upload files to moralis/ipfs,
      const metadata = await uploadFiles(
        files,
        data.title,
        data.description,
        data.signerAddress,
        contract.address
      );

      // 3) return shareable url.
      res["signatureUrl"] = signatureUrl(metadata.hash());
      res["hash"] = metadata.hash();
      res["contractUrl"] = getExplorerUrl(contract.address);

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
      try {
        // await postPacket(res.esignature request);
      } catch (e) {
        console.error("error posting esignature request", e);
      }
    } catch (e) {
      console.error("error creating esignature request", e);
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h2>Create new esignature request</h2>
            <br />

            <h3 className="vertical-margin">Esignature request title:</h3>
            <Input
              placeholder="Title of the esignature request"
              value={data.title}
              prefix="Title:"
              onChange={(e) => updateData("title", e.target.value)}
            />
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the esignature request"
              prefix="Description"
              value={data.description}
            />

            {/* TODO: add configurable amount of items */}
            <h3 className="vertical-margin">Upload documents to esign:</h3>
            <FileDrop
              files={data.files}
              setFiles={(files) => updateData("files", files)}
            />

            <h3 className="vertical-margin">Enter signer address:</h3>
            <p>
              In order to sign or agree to the documents, the viewer or
              potential signer of the documents must prove ownership of a
              particular address
            </p>
            <Input
              placeholder="Wallet address of signer"
              value={data.signerAddress}
              prefix="Signer Address:"
              onChange={(e) => updateData("signerAddress", e.target.value)}
            />
            <br />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading} // || !isValidData}
              loading={loading}
            >
              Create esignature request!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && (
              <div>
                <div className="success-text">Created esignature request!</div>
                <a href={ipfsUrl(result.hash)} target="_blank">
                  View metadata
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share this url with the potential signer:
                  <br />
                  <a href={result.signatureUrl} target="_blank">
                    Open eSignature url
                  </a>
                </p>

                {/* <div>{JSON.stringify(result, null, "\t")}</div> */}
              </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create esignature request"
                description="Requires authorizing a create esignature request operation."
              />
              <Step
                title="Wait for esignature"
                description="Your esignature request will be live for others to view and submit esignature."
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreatePolysign.propTypes = {};

export default CreatePolysign;
