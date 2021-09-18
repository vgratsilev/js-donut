import './App.css';
import ASKIIframe from './ASCIIDonut/ASCIIDonut';
import CanvasDonut from './CanvasDonut/CanvasDonut';

function App() {
    return (<div className={'App'}>
        <h1 className={'asciiLabel'}>ASCII Donut</h1>
        <ASKIIframe/>
        <h1>Canvas Donut</h1>
        <CanvasDonut/>
    </div>);
}

export default App;
