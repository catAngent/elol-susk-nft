import React, { useState } from 'react';
import './MintPage.css';
import NFTCard from '../components/NFTCard';
import Button from '../components/Button';
import { update } from '..';
import { ethers } from 'ethers';
import { contract_address, contract_functions } from '../constants';

function getMintPageElement() {
    return (
        <React.StrictMode>
            <MintPage />
        </React.StrictMode>
    );
}

function MintPage() {
    // get the contract
    let contract = new ethers.Contract(contract_address, contract_functions, globalThis.provider?.getSigner()) as contractType;

    const [nftLink, setNftLink] = useState("NFT Link"); // link to display in NFT card
    const [buttonText, setButtonText] = useState("Mint");
    const [cardDescription, setCardDescription] = useState("");

    let mint = async (link: string) => {
        setButtonText("minting...");
        setClick(async () => {}); // make clicks on button do nothing
        let transaction = await contract.mintNFT(await provider?.getSigner().getAddress() ?? "", link);
        setButtonText("waiting for confirmation...");
        await transaction.wait(); // wait for confirmation
        update("main");
    }
    const [click, setClick] = useState(() => mint);

    if(cardDescription === ""){
        contract.nextNFTId()
        .then((n: string) => {
            setCardDescription('#'+(Number(n)+1));
        });
    }

    return (
        <div className="MintPage">
            <div className="MintPageMainPanel">
                <input className='MintInput' type="text" name="nft link" placeholder='NFT Link' onChange={e => setNftLink(e.currentTarget.value ?? "null")}/>
            </div>
            <div className="MintPageSidePanel">
                <NFTCard description={cardDescription} link={nftLink} />
                <Button text={buttonText} click={() => click(nftLink)} color={'rgb(255, 145, 0)'} hoverColor={'rgb(196, 0, 0)'} />
            </div>
        </div>
    );
}

export default MintPage;
export {getMintPageElement};
