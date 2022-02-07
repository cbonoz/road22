<p align='center'>
    <img src='./img/logo_3_2.png' width=400/>
</p>

Polysign

###

Polysign is a prototype web3 implementation of esignature collection built on Polygon smart contracts and IPFS.

Enables Docusign-like capabilities / use-cases using web3 infrastructure.

Built for the Road to Web3 hackathon 2022.

### Benefits

- Polysign enables anyone to create and collect esignature against documents without a vendor agreement. A polygon smart contract is deployed for each request.
- Each packet of documents for esignature is made accessible at an IPFS url.
- When the esignature is completed, an NFT is generated that links both the signer's signature and the documents being agreed on.
- Hosted documents and the request are immutable.
- Smart contract deployed on Polygon which marks the progress/fulfillment of the esignature request. The contract can only be marked completed by the designated signer address at time of final signature.
- View history of requests and completed esignatures using the covalent chain history API directly from the app.
- An individual in the context of the Polysign application is the pairing of a canvas (handwritten) signature and wallet signature/address.

### Technologies used

- Covalent: Enables in-app history queries of past esignature requests and fulfillment for a given polygon address.
- NFTPort: Generation of the esignature record / proof. Attaches the final esignature/agreement to an NFT and saves a link to it in the smart contract.
- Moralis: Serves as main backend for the app - uses IPFS to enable support/hosting of the document packets for each request.
- Polygon: In-app deployment of the request smart contract and marked completed upon completion of the each request based on receival of signer's signature. A new Polygon contract is deployed for each new esignature request.
- Sequence: Wallet for facilitating polygon and submitting final sign request. Deployment can toggle between sequence wallet or metamask.

<b>This project is a hackathon prototype and would require additional work / deployment to be production ready.

---

To run/demo the project locally, Polysign requires the following environment variables.

<pre>
    REACT_APP_MORALIS_ID={YOUR_MORALIS_APP_ID} # Moralis app id
    REACT_APP_MORALIS_SERVER={YOUR_MORALIS_SERVER_URL} # Moralis server url
    REACT_APP_COVALENT_KEY={YOUR_COVALENT_API_KEY} # Covalent key for the history page.
    REACT_APP_NFT_PORT_KEY={YOUR_NFT_PORT_API_KEY} # NFT port api key for receipt creation.
    REACT_APP_USE_SEQUENCE={TRUE_OR_FALSE (optional)} # Indicates whether to use sequence or metamask as primary wallet provider.
</pre>

---

After declaring the above environment variables, use the below command to start the project:

<pre>
yarn
yarn start
</pre>

Recompiling contract:
`cd contracts; npx hardhat compile`

Example esignature requests contracts:
http://localhost:3000/sign/QmUAS9XJyf9gPgadoVeExESiVnVJmVJW6qtcU4dzJzwG96

<!--

Sponsors:
Polygon - Deploys a smart contract for esign
Moralis - Doc storage
Sequence - Polygon contract deploy
Covalent - history
NFTport - signature NFT

Demo flow:
Show docusign site / discuss industry baseline
Show Polysign.
Create an esign request (moralis)
Submit (Can be metamask or sequence wallet, upload via moralis)
Show result (fetched by moralis, polygon contract)
View the completed assets (polygon, contract interaction, nftport)
History page (covalent, look up a given contract owner's request/collection history)
Github

-->

### Screenshots

#### Home page

<img src="./img/home.png" width=800/>

#### Creating a request

<img src="./img/create.png" width=800/>

### Request saved via Moralis on IPFS and as smart contract

<img src="./img/request.png" width=800>

### Esigning

<img src="./img/esign.png" width=800>

### Completion esignature NFT

<img src="./img/completed.png" width=800>

### Deployed Contract

<img src="./img/contract.png" width=800/ >

### Contract source

<img src="./img/sol.png" width=800/ >

### Dev Notes

- https://docs.sequence.build/build-with-sequence/connect-wallet

#### Sequence wallet

TODO:
<img src="./img/sequence.png" width=800/ >

### Useful links

- https://ethglobal.notion.site/Road-to-Web3-Info-Center-ffe7c93baaae4f33b424f9152469e841
- https://showcase.ethglobal.com/roadtoweb3/prizes
