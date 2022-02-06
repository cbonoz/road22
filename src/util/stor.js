import axios from "axios";
import { Moralis } from "moralis";
import { ACTIVE_CHAIN_ID, IPFS_BASE_URL, USE_SEQUENCE } from "./constants";
import SequenceConnector from "./SequenceConnector";

export const saveObject = async (obj, filename) => {
  const file = new Moralis.File(filename || "metadata.json", {
    base64: btoa(JSON.stringify(obj)),
  });
  await file.saveIPFS();
  return file;
};

export const uploadFiles = async (
  files,
  title,
  description,
  signerAddress,
  contractAddress
) => {
  const params = {
    chainId: ACTIVE_CHAIN_ID.id,
  };
  if (USE_SEQUENCE) {
    params["connector"] = SequenceConnector;
  }
  await Moralis.authenticate(params);
  // abi": [
  //     {
  //       "path": "moralis/logo.jpg",
  //       "content": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3"
  //     }
  //   ]

  const resultObject = {
    title,
    signerAddress,
    description,
    contractAddress,
    files: [],
  };

  for (let i in files) {
    const f = files[i];
    const file = new Moralis.File(f.name, f);
    await file.saveIPFS();
    resultObject.files.push({
      name: f.name,
      hash: file.hash(),
      url: file.ipfs(),
    });
  }

  return await saveObject(resultObject);

  // const options = {
  //   abi,
  // };
  // const path = await Moralis.Web3API.storage.uploadFolder(options);
  // return path;
};

export async function fetchIPFSDoc(ipfsHash) {
  const url = `${IPFS_BASE_URL}/${ipfsHash}`;
  const response = await axios.get(url);
  console.log("fetch", response, url);
  return response;
}
