import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar";
import Edituser from "./components/EditUser";

//pages & components

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edituser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
