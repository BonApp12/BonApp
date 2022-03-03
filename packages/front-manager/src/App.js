import './App.css';
import Sidebar from './components/Sidebar';
import Stats from "./components/Stats";
import Header from "./components/Header";
import Graph from "./components/Graph";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Stats/>
                        <Graph/>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
