import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import temoc from "./assets/temoc.png"


function App() {
  return (
    <div className="app">
      <h1>
        Temoc Transfer
      </h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <div>
        <image source={temoc} alt="image of temoc" style={{ position: "absolute", bottom: 0, right: 0 }} />
      </div>
    </div>
  );
}
export default App;