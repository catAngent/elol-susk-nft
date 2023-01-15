import { update } from "..";
import "./MintButton.css"

function StartMintButton() {
    const click = () => {
        update("minting");
    }
    return (
        <div className="Mint">
            <div className="MintButton" onClick={e => {click()}}>mint nft</div>
        </div>
    );
}

export default StartMintButton;