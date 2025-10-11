import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage, ComicsPage } from "../pages/index";
import AppHeader from "../appHeader/AppHeader";

const basename = process.env.NODE_ENV === "production" ? "/marvel" : "/";

const App = () => {
  return (
    <div className="app">
      <Router basename={basename}>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
