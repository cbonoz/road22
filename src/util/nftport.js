import axios from "axios";
import { createJsonFile } from ".";
import { NFT_PORT_KEY } from "./constants";

export const createSignatureNFT = (
  chain,
  name,
  description,
  data,
  ownerAddress
) => {
  const params = {
    chain: chain.name || "rinkeby",
    mint_to_address: ownerAddress,
    description,
    name,
  };

  const formData = new FormData();
  const f = createJsonFile(data, "metadata.json");
  formData.append("file", f, data.title);

  var options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/mints/easy/files",
    params,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: NFT_PORT_KEY,
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    data: formData,
  };

  return axios.request(options);
};
