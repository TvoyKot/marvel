import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage, ComicsPage } from "../pages/index";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
  return (
    <div className="app">
      <Router>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/comics" element={<ComicsPage />}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
