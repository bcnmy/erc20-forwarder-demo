import { ethers } from "ethers";
import {ERC20ForwarderClient,PermitClient} from "@biconomy/mexa";

const feeProxyAddress = "0x1E13cbCb6B695D10B68b2f83D71F0D201504C598";
const transferHandlerAddress = "0x4AB0652B1049607F9E51E61144767d1C978950d0";
const tokenAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";


const tokenAbi = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

//provider used to make read calls to the dai token contract
const provider = new ethers.providers.InfuraProvider("kovan","d126f392798444609246423b06116c77");

//please add keys
const forwarderApiKey = "du75BkKO6.941bfec1-660f-4894-9743-5cdfe93c6209";
const permitApiKey = "du75BkKO6.941bfec1-660f-4894-9743-5cdfe93c6209";


let daiDomainData = {
    name : "Dai Stablecoin",
    version : "1",
    chainId : 42,
    verifyingContract : "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
  };

let feeProxyDomainData = {
    name : "TEST",
    version : "1",
    chainId : 42,
    verifyingContract : "0xBFA21CD2F21a8E581E77942B2831B378d2378E69"
  };

  const erc20ForwardRequestType = [
    {name:'from',type:'address'},
    {name:'to',type:'address'},
    {name:'token',type:'address'},
    {name:'txGas',type:'uint256'},
    {name:'tokenGasPrice',type:'uint256'},
    {name:'batchId',type:'uint256'},
    {name:'batchNonce',type:'uint256'},
    {name:'deadline',type:'uint256'},
    {name:'dataHash',type:'bytes32'}
];
  
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" }
  ];
  
  const permitType = [
    { name: "holder", type: "address" },
    { name: "spender", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "expiry", type: "uint256" },
    { name: "allowed", type: "bool" }
  ];

class TokenWallet{

    constructor(provider,wallet,client){
        this.forwarderClient = client;
        this.wallet = wallet;
        this.token = new ethers.Contract(tokenAddress,tokenAbi,wallet);
        this.permitClient = new PermitClient(provider,{apiKey:permitApiKey});
    }

    // forwarderClient needs to be created using async factory method, permitClient doesn't
    static async factory(web3Provider){
        try{
        // pass transfer handler in biconomy options    
        const forwarderClient = await ERC20ForwarderClient.factory(web3Provider,{apiKey:forwarderApiKey,feeProxyDomainData:feeProxyDomainData,feeProxyAddress:feeProxyAddress,transferHandlerAddress:transferHandlerAddress});
        console.log(forwarderClient);
        const provider = new ethers.providers.Web3Provider(web3Provider);
        const wallet = provider.getSigner();
        return new TokenWallet(web3Provider,wallet,forwarderClient);
        }
        catch(error)
        {
            console.log('here');
            console.log(error);
            return null;
        }
       
    }

    async transferHandlerApproved(){
        const allowance = await this.token.allowance(await this.wallet.getAddress(),transferHandlerAddress);
        if (allowance > 0)
            return true;
        else
            return false;
    }

    async feeProxyApproved(){
        const allowance = await this.token.allowance(await this.wallet.getAddress(),feeProxyAddress);
        if (allowance > 0)
            return true;
        else
            return false;
    }

    async getTokenGasPrice(){
        return await this.forwarderClient.getTokenGasPrice(daiDomainData.verifyingContract);
    }

    async permitFeeProxy(){
        await this.permitClient.daiPermit(daiDomainData,feeProxyAddress,(Date.now()/1000)+600,true);
    }

    async permitTransferHandler(){ //replace call with dai permit
        await this.permitClient.daiPermit(daiDomainData,transferHandlerAddress,(Date.now()/1000)+600,true);
    }

    //(await transferHandler.estimateGas.transfer(tokenAddress,to,amount)

    async buildTransferTx(to,amount){
        return await this.forwarderClient.buildTransferTx(to,daiDomainData.verifyingContract,amount,(Date.now()/1000)+600);
    }

    async sendTransferTx(req){
        await this.forwarderClient.sendTxEIP712(req);
    }

}

export default TokenWallet;