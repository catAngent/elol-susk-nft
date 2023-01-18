/// <reference types="react-scripts" />
import { ethers } from "ethers";

import { Provider, Web3Provider } from "@ethersproject/providers";

declare global {
    type stateType = "connect" | "main" | "minting";
    interface Window {
        ethereum?: ExternalProvider;
    }
    var provider: Web3Provider | null;
    var state: stateType;

    type contractType = ethers.Contract & {
        mintNFT: (address: string, link: string) => Promise<Transaction>;
        nextNFTId: () => Promise<string>;
        tokenURI: (tokenId: number) => Promise<string>;
    }
}
