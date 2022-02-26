import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
            </div>
        </div>
    </div>
  );
}

export default App;
