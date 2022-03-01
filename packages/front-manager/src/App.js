import './App.css';
import Sidebar from './components/Sidebar';
import Stats from "./components/Stats";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar/>
                    <div className="col p-2">
                        <Stats/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
