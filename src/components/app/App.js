import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages/index";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
  return (
    <div className="app">
      <Router>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
