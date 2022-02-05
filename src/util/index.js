import { ACTIVE_CHAIN_ID, IPFS_BASE_URL } from "./constants";

export const ipfsUrl = (cid, fileName) => {
  // let url = `https://ipfs.io/ipfs/${cid}`;
  let url = `${IPFS_BASE_URL}/${cid}`;
  if (fileName) {
    return `${url}/${fileName}`;
  }
  return url;
};

export const signatureUrl = (cid) => `${window.location.origin}/sign/${cid}`;

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getExplorerUrl = (hash) => `${ACTIVE_CHAIN_ID.url}/${hash}`;

export const createJsonFile = (signload, fileName) => {
  const st = JSON.stringify(signload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const getDateStringFromTimestamp = (ts, showTime) => {
  const d = new Date(ts);
  if (showTime) {
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
  return d.toLocaleDateString();
};

export const col = (k) => ({
  title: capitalize(k),
  dataIndex: k,
  key: k,
});

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
