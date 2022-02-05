export const MORALIS_KEY = process.env.REACT_APP_MORALIS_KEY; // your API key from https://nft.storage/manage)
export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

console.log("hashes", MORALIS_KEY, COVALENT_KEY, NFT_PORT_KEY);

export const APP_NAME = "Polysign";
export const APP_DESC = "Polygon-backed esignature requests";


export const CHAIN_OPTIONS = {
  137: {
    name: "Matic Mainnet",
    url: "https://explorer-mainnet.maticvigil.com/",
    id: 137,
  },
  80001: {
    name: "Mumbai",
    url: "https://mumbai.polygonscan.com/address/",
    id: 80001,
  },
};
// 1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
// 42: { name: "kovan", url: "https://kovan.etherscan.io/tx/", id: 42 },
// 4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },

export const ACTIVE_CHAIN_ID = CHAIN_OPTIONS["137"];

export const EXAMPLE_FORM = {}