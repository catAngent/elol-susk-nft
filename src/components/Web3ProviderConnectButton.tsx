import React from 'react';
import './Web3ProviderConnectButton.css';
import { ethers } from "ethers";
import { update } from '..';

function Web3ProviderConnectButton() {
    let requestAccount = async (e: React.MouseEvent) => {
        if(window.ethereum != null){
            globalThis.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await globalThis.provider.send("eth_requestAccounts", []);
            const signer = globalThis.provider.getSigner();
            console.log("Account: "+await signer.getAddress());
            update("main");
        } else {
            globalThis.provider = undefined
            alert("no ethereum provider pls install metamask or something");
            update("connect");
        }
    };

    return (
        <div className="Web3ProviderConnect">
            <div className="Web3ProviderConnectButton" onClick={e => {requestAccount(e)}}>connect to<br /> MetaMask</div>
        </div>
    );
}

export default Web3ProviderConnectButton;
