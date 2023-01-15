/// <reference types="react-scripts" />
import { ethers } from "ethers";

import { ExternalProvider } from "@ethersproject/providers";

declare global {
    type stateType = "connect" | "main" | "minting";
    interface Window {
        ethereum?: ExternalProvider;
    }
    var provider: ethers.providers.Web3Provider | undefined;
    var state: stateType;
}
