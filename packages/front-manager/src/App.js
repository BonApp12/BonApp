import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar/>
                    <Navbar/>
                </div>
            </div>
        </div>
    );
}

export default App;
