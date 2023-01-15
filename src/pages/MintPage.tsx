import React, { useState } from 'react';
import './MintPage.css';
import NFTCard from '../components/NFTCard';
import MintButton from '../components/MintButton';

function getMintPageElement() {
    return (
        <React.StrictMode>
            <MintPage />
        </React.StrictMode>
    );
}

function MintPage() {

    const [nftName, setNftName] = useState("NFT Name");
    const [nftLink, setNftLink] = useState("NFT Link");

    return (
        <div className="MintPage">
            <div className="MintPageMainPanel">
                <input className='MintInput' type="text" name="nft name" placeholder='NFT Name' onChange={e => setNftName(e.currentTarget.value ?? "null")}/>
                <input className='MintInput' type="text" name="nft link" placeholder='NFT Link' onChange={e => setNftLink(e.currentTarget.value ?? "null")}/>
            </div>
            <div className="MintPageSidePanel">
                <NFTCard description={nftName} link={nftLink} />
                <MintButton />
            </div>
        </div>
    );
}

export default MintPage;
export {getMintPageElement};
