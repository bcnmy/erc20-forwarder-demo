function reducer(state, action) {
    switch(action.type) {

        case 'LOGIN':
          return{
              logOutModal:false,
              loading:false,
              loggedIn:true,
              txModal:false,
              tokenWallet:action.tokenWallet,
              address:action.address,
              tokenBalance:action.tokenBalance,
              transferHandlerApproved:action.transferHandlerApproved,
              transferHandlerApproval:null,
              feeProxyApproved:action.feeProxyApproved,
              feeProxyApproval:null,
              transferAmount:"",
              transferFee:"",
              transferDestination:"",
              transferTx:null,
              txHash:""
          }

        case 'LOGOUT':
            return{
                loggedIn:false,
                loading:false,
                txModal:false,
                tokenWallet:undefined,
                tokenBalance:0,
                transferDestination:""
            }

        case 'LOGOUT_MODAL':
            return{
                ...state,
                logOutModal:true
            }

        case 'CANCEL_LOGOUT_MODAL':
            return{
                ...state,
                logOutModal:false
            }

        case 'UPDATE_BALANCE':
            return{
              ...state,
              tokenBalance:action.tokenBalance
            }

        case 'UPDATE_TOKEN_GAS_PRICE':
            return{
                ...state,
                tokenGasPrice:action.tokenGasPrice
            }

        case 'LOADING':
            return{
                ...state,
                loading:true
            }

        case 'NOT_LOADING':
            return{
                ...state,
                loading:false
            }

        case 'SIGN_TRANSFER_HANDLER_APPROVAL':
            return {
                ...state,
                transferHandlerApproval:action.transferHandlerApproval
            }

        case 'TRANSFER_HANDLER_APPROVED':
            return {
                ...state,
                transferHandlerApproved:true
            }

        case 'SIGN_FEE_PROXY_APPROVAL':
            return {
                ...state,
                feeProxyApproval:action.feeProxyApproval
            }
        
        case 'FEE_PROXY_APPROVED':
            return {
                ...state,
                feeProxyApproved:true
            }

        case 'PROPOSE_TX':
            return {
                ...state,
                transferAmount:action.amount,
                transferFee:action.fee,
                transferDestination:action.to,
                transferTx:action.tx,
                txModal:true
            }

        case 'CANCEL_TX_MODAL' :
            return {
                ...state,
                txModal:false,
                transferTx:null
            }

        case 'TX_HASH':
            return{
                ...state,
                txHash:action.txHash
            }

        default:
            return state
    }
  };

  export default reducer;