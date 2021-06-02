import { BrowserRouter, Switch } from "react-router-dom";
import "./scss/index.scss";
import Provider from "./components/Provider";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <div className="app">
                    <Provider />
                </div>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
