import React,{useEffect, useState} from "react";
import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { cont_address,cont2_abi,cont2_address,token_Address,cont_abi,token_abi } from "../../components/config";

import { useAccount, useDisconnect } from 'wagmi'
import { useContractReads,  useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
const WithdrawModal = ({regAddress,calltest ,minWithdraw, maxWithdraw}) => {


  const [WithdrawAmount, set_WithdrawAmount] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [count, setCount] = useState(0);
  const [allow, set_allow] = useState(true);

  const { address, isConnecting ,isConnected,isDisconnected} = useAccount()
  const { chain } = useNetwork()

  // let allow= true;


  const { data:stakeResult_withdrawReward,isLoading: isLoading2_withdrawReward,isSuccess: isSuccess2_withdrawReward, write:withdrawReward } = useContractWrite({
  
    address: cont_address,
    abi: cont_abi,
    functionName: 'withdrawReward',                                                           
    args: [Number(WithdrawAmount)*10**18,totalEarning,"7653687856888"],
  
  })
  
  const networkId=56;
  
  
   const waitForTransaction4 = useWaitForTransaction({
      hash: stakeResult_withdrawReward?.hash,
      onSuccess(data) {
        // alert("W successful");
        calltest()
        console.log('Success2',data )
      },
    })
  
    const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
    useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){
  
        withdrawReward?.()
      }
  
    })
  
    async function withdraw()
    {
      if(allow==false) {return;}

      set_allow(false);      
      // alert(isLoading2_withdrawReward)
      // if(isLoading2_withdrawReward)
      // {
      //   alert("transaction is under queue")
      // }
      if(isDisconnected)
      {
        alert("kindly connect your wallet ");
        set_allow(true);      

        return;
      }
      const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com"));
  
              
    const balance =await  web3.eth.getBalance(regAddress)
    const contract=new web3.eth.Contract(cont2_abi,cont2_address);
    let totalEarning=0; 
    try{
       totalEarning = await contract.methods.get_totalEarning(regAddress).call();   

     }
     catch{
      
     }

      if(WithdrawAmount<Number(minWithdraw)/10**18)
      {
        alert("You can't withdraw less than "+Number(minWithdraw)/10**18 +" tokens");
        set_allow(true);      

        return;
      }
      if(WithdrawAmount>Number(maxWithdraw)/10**18)
      {
        alert("You can't withdraw more than "+Number(maxWithdraw)/10**18 +" tokens");
        set_allow(true);      

        return;
      }
      // if(regAddress.toLowerCase()!=address.toLowerCase())
  
      // {
      //   alert("kindly change your crypto wallet to the Registered wallet")
      //   set_allow(true);      

      //   return;
      // }
      if(WithdrawAmount==0 )
      {
        alert("kindly write amount to withdraw ");
        set_allow(true);      

        return;
      }
  
  
      if(((Number(totalEarning))/10**18) < Number(WithdrawAmount))
      {
        alert("You dont have enough balance ");
        set_allow(true);      

        return;
      }
      console.log("object fun end"+totalEarning);
      set_totalEarning(totalEarning)

      // if(chain.id!=networkId)
      // {
      //   reward_switch?.();
      // }else{
      //   withdrawReward?.()
  
      // }
      // console.log(data__unstake);

  
    }


useEffect(()=>{
  if(address!=undefined && count!=0)
  {
    console.log("object withdraw ");
    if(chain.id!=networkId)
    {
      reward_switch?.();
    }else{
      withdrawReward?.()
      // set_totalEarning(0)

    }
  }
  console.log(count);
  setCount(count+1)



},[totalEarning])






  return (
    <div className="with-draw-modal-popup flex flex-col">
      <div className="model-hdr">Withdrawal Earning</div>
      <div className="model-body flex flex-col">
        <div className="body-title flex items-center justify-between">
          <h1 className="b-title">Withdrawal Payment</h1>
          <img src="/images/rocket.svg" className="icon" />
        </div>
        {/* <div className="input-field flex flex-col mb-4">
          <h1 className="lbl mb-2">My Balance</h1>
          <input type="text" 
          className="txt" 
          value={}
          />
        </div> */}
        <div className="input-field flex flex-col mb-4">
          <h1 className="lbl mb-2">Amount (Min 1 DU - Max 2500 DU)</h1>
          <input type="number" 
          className="txt"
          min={0}
          value={WithdrawAmount} 
          onChange={(e)=>{
            set_WithdrawAmount(e.target.value)
          }}

          />
        </div>
        <button className="btn-width button mt-2" onClick={()=>withdraw(WithdrawAmount)}>
        {!isLoading2_withdrawReward  && !isSuccess2_withdrawReward &&<div>Withdraw</div>}
        {isLoading2_withdrawReward && !isSuccess2_withdrawReward && <div>Loading...</div>}
        {!isLoading2_withdrawReward && isSuccess2_withdrawReward && <div>Withdraw</div>}

        </button>
      </div>
    </div>
  );
};

export default WithdrawModal;
