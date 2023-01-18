import "./Button.css";

function Button(props: {text: JSX.Element | string, click: (e: React.MouseEvent) => void, color: string, hoverColor: string}) {
    let element: JSX.Element;
    if(typeof props.text === 'string') element = <>{props.text}</>;
    else element = props.text;
    
    return (
        <div className="ButtonContainer">
            <div className="Button" style={{"--buttonColor": props.color, "--hoverButtonColor": props.hoverColor} as React.CSSProperties} onClick={e => {props.click(e)}}>
                {element}
            </div>
        </div>
    );
}

export default Button;