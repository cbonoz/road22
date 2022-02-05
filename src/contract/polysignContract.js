import { ethers } from "ethers";
import { USE_SEQUENCE } from "../util/constants";
import { connectWallet, getWallet } from "../util/sequence";
import { POLYSIGN_CONTRACT } from "./metadata";

const getSigner = async () => {
  let signer;
  if (USE_SEQUENCE) {
    await connectWallet();
    signer = await getWallet().getSigner();
  } else {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  return signer;
};

// https://dapp-world.com/smartbook/how-to-use-ethers-with-polygon-k5Hn
export async function deployContract(title, signerAddress) {
  const signer = await getSigner();

  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(
    POLYSIGN_CONTRACT.abi,
    POLYSIGN_CONTRACT.bytecode,
    signer
  );

  const address = ethers.utils.getAddress(signerAddress);

  // Start deployment, returning a promise that resolves to a contract object
  //   let contract = { address: signerAddress }; // TODO: fix factory
  const contract = await factory.deploy(title, address);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const markContractCompleted = async (contractAddress, signatureUrl) => {
  const signer = await getSigner();
  const polysignContract = new ethers.Contract(
    contractAddress,
    POLYSIGN_CONTRACT.abi,
    signer
  );
  return await polysignContract.markCompleted(signatureUrl);
};
