import ReactDOM from 'react-dom/client';
import {getMainPageElement} from './pages/MainPage';
import './index.css';
import { getMintPageElement } from './pages/MintPage';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

function update(state: stateType){
    globalThis.state = state;
    switch(state){
        case "connect":
        case "main":
            root.render(getMainPageElement());
            break;
        case "minting":
            root.render(getMintPageElement());
            break;
    }
}

update("connect");

export {update}