import React, { useState } from 'react';
import './MainPage.css';
import Button from '../components/Button';
import { update } from '..';
import { ethers } from 'ethers';
import NFTCard from '../components/NFTCard';
import { contract_address, contract_functions } from '../constants';
import detectEthereumProvider from '@metamask/detect-provider'

function getMainPageElement() {
    return (
        <React.StrictMode>
            <MainPage />
        </React.StrictMode>
    );
}

function MainPage() {
    // get the contract
    let contract = new ethers.Contract(contract_address, contract_functions, globalThis.provider?.getSigner()) as contractType;

    const requestAccount = async () => {
        const ethereum = await detectEthereumProvider();
        if(!ethereum){ // ethereum provider not found
            globalThis.provider = null
            alert("pls install metamask"); // TODO: message box component for errors
            return;
        }
        globalThis.provider = new ethers.providers.Web3Provider(ethereum, "any");
        const { chainId } = await globalThis.provider.getNetwork()
        if(chainId !== 5) { // goerli id = 5
            globalThis.provider = null;
            alert("pls connect to Goerli testnet"); // TODO: message box component for errors
            return;
        }
        await globalThis.provider.send("eth_requestAccounts", []); // get permission for an account
        const signer = globalThis.provider.getSigner();
        console.log("Account: "+await signer.getAddress());
        update("main"); // change state to main
    };

    const [cards, setCards] = useState({component: <div className='MainPageCards'><h3>loading...</h3></div>});    
    
    const init = async () => {
        let cardsData: {id: number, link: string}[] = [];
        let nextNFTId = parseInt(await contract.nextNFTId()); // amount of nft minted = id of next NFT

        let cardPromises: Promise<void>[] = []; // list of promises to wait for

        for(var i = Math.max(0, nextNFTId - 10); i < nextNFTId; i++){ // last 10 NFTs
            let j = i; // in promise, loop is already finished, so i = lastNFTid-1, so im copying its value

            cardPromises.push(
                contract.tokenURI(j)
                .then((uri) => {
                    cardsData.push({id: j+1, link: uri});
                })
            );
        }

        for (var promise of cardPromises) await promise; // wait for all promises to finish so cardsData is full

        setCards({component: <div className='MainPageCards'>    
            {
                cardsData.map((data: {id: number, link: string}) => (
                    <div key={""+data.id} style={{order: ""+data.id}}>
                        <NFTCard description={"#"+data.id} link={data.link}></NFTCard>
                    </div>
                ))
            }
        </div>});
    };

    const [needInit, setNeedInit] = useState(true);    
    if(needInit && state !== "connect") { // init only 1 time
        setNeedInit(false);
        init();
    }

    return (
        <div className="MainPage">
            <div className='MainPageHeader'>
                <h1>elol susk nft minting website</h1>
                <h4>you can mint your rubbish nft here</h4>
            </div>
            {globalThis.state === "connect" ? ( 
                <div className='MainPageButtons'>
                    <Button text={<>Connect to<br />MetaMask</>} click={e => requestAccount()} color={'rgb(0, 162, 255)'} hoverColor={'rgb(0, 196, 0)'}  />
                </div>
            ) : (
                <div className='MainPageButtons'>
                    <Button text={'Mint NFT'} click={e => update("minting")} color={'rgb(255, 145, 0)'} hoverColor={'rgb(196, 0, 0)'} />
                </div>
            )}
            {globalThis.state === "connect" ? <></> : cards.component}
        </div>
    );
}

export default MainPage;
export {getMainPageElement};
