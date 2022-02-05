import { sequence } from "0xsequence";
import { ACTIVE_CHAIN_ID, APP_NAME } from "./constants";

const wallet = new sequence.Wallet();

export const connectWallet = async () => {
  const connectDetails = await wallet.connect({
    networkId: ACTIVE_CHAIN_ID.id,
    app: APP_NAME,
    authorize: true,
  });

  console.log("user accepted connect?", connectDetails.connected);
  console.log(
    "users signed connect proof to valid their account address:",
    connectDetails.proof
  );
  return connectDetails;
};

export const getWallet = () => wallet;
