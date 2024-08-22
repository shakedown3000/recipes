import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      {/* <UserProvider> */}
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              {/* <Recipes /> */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      h{/* </UserProvider> */}
    </>
  );
}

export default App;
