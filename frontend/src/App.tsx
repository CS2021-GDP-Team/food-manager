import { BrowserRouter } from "react-router-dom";
import "./scss/index.scss";
import Provider from "./components/Provider";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Provider />
            </div>
        </BrowserRouter>
    );
}

export default App;
