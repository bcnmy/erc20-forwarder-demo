import { Text,Button,Input } from "@chakra-ui/core";
import QRCode from "react-qr-code";
import { useForm, Controller } from "react-hook-form";
import { ethers } from "ethers";
import useInterval from '@use-it/interval';



function TokenSend({store,dispatch}){

    const { register, handleSubmit } = useForm();

    const updateBalance = async() => {
        if (store.tokenWallet!==undefined){
            const newBalance = (parseFloat((await store.tokenWallet.token.balanceOf(store.address)).toString())/(Math.pow(10,18))).toFixed(2);
            dispatch({type:'UPDATE_BALANCE',tokenBalance:newBalance});
        }
    }

    useInterval(updateBalance,4000);

    // This method calls tokenWallet.buildTransferTx
    const onSubmit = async(data) => {
        console.log("submitted");
        const builtTx = await store.tokenWallet.forwarderClient.buildTransferTx(store.tokenWallet.token.address,data.to,data.amount);
        const tx = builtTx.request;
        const fee = builtTx.cost;
        console.log(tx);
        console.log(fee);
        dispatch({type:'PROPOSE_TX',amount:data.amount, fee:fee, to:data.to, tx:tx});
    }
    
    const approveFeeProxy = async() => {
        dispatch({type:'LOADING'});
        try{
            await store.tokenWallet.permitClient.permitFeeProxy();
            dispatch({type:'FEE_PROXY_APPROVED'});
        }
        catch(error){
            console.log(error);
        }
        dispatch({type:'NOT_LOADING'});
    }

    const approveTransferHandler = async() => {
        dispatch({type:'LOADING'});
        try{
            await store.tokenWallet.permitTransferHandler();
            dispatch({type:'TRANSFER_HANDLER_APPROVED'});
        }
        catch(error){
            console.log(error);
        }
        dispatch({type:'NOT_LOADING'});
    }

    if(!store.loggedIn){
        return(
            <div>
            </div>
            )
    }
    if((!store.transferHandlerApproved)||(!store.feeProxyApproved)){
        return(
            <div>
                <QRCode value={"ethereum:"+store.address} bgColor="#FEEBC8" fgColor="#1D4044"/>
                <Text fontSize="96px" fontWeight="600" color="teal.900">◈ {store.tokenBalance} </Text>
                <Text fontSize="3xl" color="red.900" fontWeight="600"> Approval Needed to Proceed </Text>
                <Button onClick={approveFeeProxy} isDisabled={store.feeProxyApproved} leftIcon="lock" bg="red.700" color="orange.200">Approve Biconomy Fee Proxy</Button><br></br><br></br>
                <Button onClick={approveTransferHandler} isDisabled={store.transferHandlerApproved} leftIcon="lock" bg="red.700" color="orange.200">Approve Transfer Handler</Button><br></br><br></br>
            </div>
        )
    }
    return(
    <div>
        <QRCode value={"ethereum:"+store.address} bgColor="#FEEBC8" fgColor="#1D4044"/>
        <Text fontSize="72px" fontWeight="600" color="teal.900">◈ {store.tokenBalance} </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl" color="teal.900" fontWeight="600"> Send To</Text>
        <Input name="to" ref={register({pattern: /^0x[a-fA-F0-9]{40}$/})} placeholder="Enter Destination Address" size="lg"/><br></br>
        <Text fontSize="xl" color="teal.900" fontWeight="600"> Amount To Send</Text>
        <Input type="number" name="amount" ref={register({min:0})} placeholder="e.g 420.69" size="lg"/><br></br>
        <Button type="submit" w="100%" leftIcon="arrow-right" bg="teal.700" color="orange.200">Send</Button>
        </form>
    </div>
    )
}

export default TokenSend;