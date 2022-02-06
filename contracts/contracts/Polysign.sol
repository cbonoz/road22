//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Polysign is Ownable {
    // A Polysign contract represents a esignature processto be completed.
    
    string private title; // Title of the polysign contract.
    string private resourceUrl; // Link to the polysign documents to be signed.
    address private signerAddress; // Designated signer.

    string private signatureUrl; // Completed signature NFt (could be private).
    bool completed;

    event UpdatedResourceUrl(string oldStr, string newStr);

    constructor(string memory _title,  address _signerAddress) {
        console.log("Deploying a Polysign contract with title:", _title);
        title = _title;
        signerAddress = _signerAddress;
        completed = false;
    }

    function updateResourceUrl(string memory newUrl) external onlyOwner {
        emit UpdatedResourceUrl(resourceUrl, newUrl);
        resourceUrl = newUrl;
    }

    function markCompleted(string memory _signatureUrl) public {
        // signatureUrl is the url of the completed esignature receipt.
        // Assert caller has the same address as seller address else fail.
        require(address(msg.sender) == this.signerAddress, "Only the designated signer can complete the contract");
        signatureUrl = _signatureUrl;
        completed = true;
    }

    function getTitle() public view returns (string memory) {
        return title;
    }

    function getResourceUrl() public view returns (string memory) {
        return resourceUrl;
    }

    // Only the owner can see the signer's completed signature.
    function getSignatureUrl() public view onlyOwner returns (string memory) {
        return signatureUrl;
    }

    function getSigner() public view returns (address) {
        return signerAddress;
    }

}
