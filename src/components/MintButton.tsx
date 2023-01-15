import "./MintButton.css"

function MintButton() {
    const click = () => {
        alert("test");
    }
    return (
        <div className="Mint">
            <div className="MintButton" onClick={e => {click()}}>mint</div>
        </div>
    );
}

export default MintButton;