import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { signatureUrl, ipfsUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";

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
      data.itemName &&
      data.itemCost &&
      data.destination &&
      data.units
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    if (!isValidData) {
      alert("Title, description, and url are required");
      return;
    }
    setError(undefined);
    setLoading(true);

    const body = {
      title: data.title,
      items: [
        {
          name: data.itemName,
          cost: data.itemCost,
        },
      ],
      description: data.description,
      units: data.units,
      createdAt: new Date().getTime(),
      destination: data.destination,
      url: data.url,
      recurring: data.recurring,
    };

    try {
      const res = await CreatePolysign(body);
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

            <h3 className="vertical-margin">Packet title:</h3>
            <Input
              placeholder="Title of the esignature request"
              value={data.packetName}
              prefix="Title:"
              onChange={(e) =>
                updateData("esignature requestName", e.target.value)
              }
            />
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the esignature request"
              prefix="Description"
              value={data.description}
            />

            {/* TODO: add configurable amount of items */}
            {/* <h3 className="vertical-margin">General information:</h3> */}
            <br />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading || !isValidData}
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
                <a
                  href={ipfsUrl(result.ipnft, "metadata.json")}
                  target="_blank"
                >
                  View metadata
                </a>
                <br />
                <a href={signatureUrl(result.ipnft)} target="_blank">
                  Share esignature URL
                </a>

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
