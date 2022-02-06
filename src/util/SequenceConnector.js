import { AbstractWeb3Connector } from "moralis";
import { ACTIVE_CHAIN_ID } from "./constants";
import { getWallet } from "./sequence";

class SequenceConnector extends AbstractWeb3Connector {
  type = "SequenceConnector";

  async activate({ chainId: providedChainId, mobileLinks } = {}) {
    // Cleanup old data if present to avoid using previous sessions
    try {
      await this.deactivate();
    } catch (error) {
      // Do nothing
    }

    this.provider = getWallet().getProvider();

    if (!this.provider) {
      throw new Error(
        "Could not connect with WalletConnect, error in connecting to provider"
      );
    }

    const accounts = await this.provider.listAccounts();

    const account = accounts[0];
    const { chainId } = this.provider;
    const verifiedChainId = chainId || ACTIVE_CHAIN_ID.id + "";

    this.account = account;
    this.chainId = verifiedChainId;

    this.subscribeToEvents(this.provider);

    return { provider: this.provider, account, chainId: verifiedChainId };
  }

  async deactivate() {
    this.unsubscribeToEvents(this.provider);

    try {
      if (window) {
        window.localStorage.removeItem("sequenceconnect");
      }
    } catch (error) {
      // Do nothing
    }

    this.account = null;
    this.chainId = null;

    if (this.provider) {
      try {
        await this.provider.disconnect();
      } catch {
        // Do nothing
      }
    }
  }
}

export default SequenceConnector;
