import React,{useState} from "react";
import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { cont_address,token_Address,cont_abi,token_abi } from "../../components/config";

import { useAccount, useDisconnect } from 'wagmi'
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
const WithdrawModal = ({totalEarning,directs,team,set_regAddress,regAddress,totalRefIncome,test , minWithdraw, maxWithdraw}) => {


  const [WithdrawAmount, set_WithdrawAmount] = useState(0);

  const { address, isConnecting ,isConnected,isDisconnected} = useAccount()
  const { chain } = useNetwork()



  const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdrawReward } = useContractWrite({
  
    address: cont_address,
    abi: cont_abi,
    functionName: 'withdrawReward',                                                           
    args: [Number(WithdrawAmount)*10**18,totalEarning,"7653687856888"],
  
  })
  
  const networkId=97;
  
  
   const waitForTransaction4 = useWaitForTransaction({
      hash: stakeResult_withdrawReward?.hash,
      onSuccess(data) {
      test?.()
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
  
    function withdraw()
    {
      if(isDisconnected)
      {
        alert("kindly connect your wallet ");
        return;
      }
  
      if(WithdrawAmount<Number(minWithdraw)/10**18)
      {
        alert("You can't withdraw less than "+Number(minWithdraw)/10**18 +" tokens");
        return;
      }
      if(WithdrawAmount>Number(maxWithdraw)/10**18)
      {
        alert("You can't withdraw more than "+Number(maxWithdraw)/10**18 +" tokens");
        return;
      }
      if(regAddress.toLowerCase()!=address.toLowerCase())
  
      {
        alert("kindly change your crypto wallet to the Registered wallet")
        return;
      }
      if(WithdrawAmount==0 )
      {
        alert("kindly write amount to withdraw ");
        return;
      }
  
  
      if(((Number(totalEarning))/10**18) < Number(WithdrawAmount))
      {
        alert("You dont have enough balance");
        return;
      }
      if(chain.id!=networkId)
      {
        reward_switch?.();
      }else{
        withdrawReward?.()
  
      }
      // console.log(data__unstake);
      
  
    }









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
        <button className="btn-width button mt-2" onClick={()=>withdraw(WithdrawAmount)}>Withdraw Payment</button>
      </div>
    </div>
  );
};

export default WithdrawModal;
