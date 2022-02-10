import { ethers } from "ethers";
import { USE_SEQUENCE, ACTIVE_CHAIN_ID } from "../util/constants";
import { connectWallet, getWallet } from "../util/sequence";
import { POLYSIGN_CONTRACT } from "./metadata";

const getSigner = async () => {
  let signer;
  if (USE_SEQUENCE) {
    await connectWallet();
    const wallet = getWallet();
    signer = await wallet.getAuthSigner(ACTIVE_CHAIN_ID.id);
  } else {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  return signer;
};

export const getPrimaryAccount = async () => {
  let provider;
  if (USE_SEQUENCE) {
    await connectWallet();
    provider = getWallet().getProvider();
  } else if (window.ethereum) {
    await window.ethereum.enable();
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    return undefined; // No supported account detected.
  }

  const accounts = await provider.listAccounts();
  return accounts[0];
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

  const validatedAddress = ethers.utils.getAddress(signerAddress);

  // Start deployment, returning a promise that resolves to a contract object
  let contract;
  if (USE_SEQUENCE) {
    const transaction = factory.getDeployTransaction(title, validatedAddress);
    contract = await signer.sendTransaction(transaction);
  } else {
    contract = await factory.deploy(title, validatedAddress);
    await contract.deployed();
  }
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};

export const markContractCompleted = async (contractAddress, signatureUrl) => {
  if (!contractAddress || !signatureUrl) {
    return {};
  }
  const signer = await getSigner();
  const polysignContract = new ethers.Contract(
    contractAddress,
    POLYSIGN_CONTRACT.abi,
    signer
  );
  const result = await polysignContract.markCompleted(signatureUrl);
  return result;
};
