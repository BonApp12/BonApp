import './App.css';
import Sidebar from './components/sidebar';
import Stats from "./components/stats";
import Header from "./components/header";
import Graph from "./components/graph";

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
