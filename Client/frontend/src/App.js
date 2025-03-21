import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WatchParty from "./pages/WatchParty";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/party/:id" element={<WatchParty />} />
      </Routes>
    </Router>
  );
}

export default App;
