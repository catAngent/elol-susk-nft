import React from 'react';
import './MainPage.css';
import Web3ProviderConnectButton from '../components/Web3ProviderConnectButton';
import StartMintButton from '../components/StartMintButton';

function getMainPageElement() {
    return (
        <React.StrictMode>
            <MainPage />
        </React.StrictMode>
    );
}

function MainPage() {
    let button = globalThis.state === "connect" ? <Web3ProviderConnectButton /> : <StartMintButton />
    return (
        <div className="MainPage">
            <div className='MainPageHeader'>
                <h1>elol susk nft minting website</h1>
                <h4>you can mint your rubbish nft here</h4>
            </div>
            <div>
                {button}
            </div>
        </div>
    );
}

export default MainPage;
export {getMainPageElement};
