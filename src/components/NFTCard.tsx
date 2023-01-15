import "./NFTCard.css"

function NFTCard(props: {description: string, link: string}){
    return (
        <div className="NFTCard">
            <div className="NFTText">{props.description}</div>
            <img src={props.link} alt={props.link} className="NFTImage" />
        </div>
    );
}

export default NFTCard;