export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key
export const MORALIS_APP_ID = process.env.REACT_APP_MORALIS_ID; // your API key from https://nft.storage/manage)
export const MORALIS_SERVER = process.env.REACT_APP_MORALIS_SERVER; // your API key from https://nft.storage/manage)

export const APP_NAME = "Polysign";
export const APP_DESC = "Polygon-backed esignature requests";

export const CHAIN_OPTIONS = {
  80001: {
    name: "Mumbai",
    url: "https://mumbai.polygonscan.com/",
    id: 80001,
  },
  137: {
    name: "Matic Mainnet",
    url: "https://polygonscan.com/",
    id: 137,
  },
};
// 1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
// 42: { name: "kovan", url: "https://kovan.etherscan.io/tx/", id: 42 },
// 4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },

export const ACTIVE_CHAIN_ID = CHAIN_OPTIONS["80001"];

export const EXAMPLE_FORM = {
  title: "Condo agreement",
  description: "Please agree to the included condo agreement documents",
  signerAddress: "0x8E5D12B8aE2E256CC2584E218d83A0ea43b2c305",
  files: [],
};

export const USE_SEQUENCE = process.env.REACT_APP_USE_SEQUENCE || false;

export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";

console.log("hashes", MORALIS_APP_ID, COVALENT_KEY, NFT_PORT_KEY, USE_SEQUENCE);
