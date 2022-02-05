export const uploadPacket = async (abi) => {
  // abi": [
  //     {
  //       "path": "moralis/logo.jpg",
  //       "content": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3"
  //     }
  //   ]
  const options = {
    abi,
  };
  const path = await Moralis.Web3API.storage.uploadFolder(options);
  return path
};
