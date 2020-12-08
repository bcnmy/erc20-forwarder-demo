import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    network: "kovan",
    options: {
      infuraId: "d126f392798444609246423b06116c77" // required
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions // required
});

export default web3Modal;