import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Navbar from "./components/Navbar/Navbar";
import SignupPage from "./pages/Signup/Signup";
import ProfilePage from "./pages/Profile/ProfilePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { UserProvider } from "./Context/UserContext";
import { SearchProvider } from "./Context/SearchContext"; // Importiere den SearchProvider
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/LoginPage";
import DetailPage from "./pages/Detailpage/Detailpage";
import AllRecipes from "./pages/AllRecipes/AllRecipes";

function App() {
  return (
    <section className="page-wrapper">
      <UserProvider>
        <SearchProvider>
          <BrowserRouter>
            <Navbar />
            <main className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route path="/recipes/:id" element={<DetailPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </SearchProvider>
      </UserProvider>
    </section>
  );
}

export default App;
