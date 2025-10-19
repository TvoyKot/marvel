import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const SingleComicLayout = lazy(() =>
  import("../pages/singleComicLayout/SingleComicLayout")
);
const SingleCharacterLayout = lazy(() =>
  import("../pages/singleCharacterLayout/SingleCharacterLayout")
);
const Page404 = lazy(() => import("../pages/404"));

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<Spinner />}>
        <Router>
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage
                    Component={SingleComicLayout}
                    dataType="comic"
                  />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType="character"
                  />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
