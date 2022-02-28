import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";

function App() {
    return (<div className="App">
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar/>
                <div className="col p-2">
                    <Navbar/>
                    <Stats/>
                </div>
            </div>
        </div>
    </div>);
}

export default App;
