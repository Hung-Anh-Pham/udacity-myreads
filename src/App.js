import "./css/App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";

function App() {

  const navigator = useNavigate();


  return (
    <div className="app">
      <Routes>

        <Route
          path="/search"
          element={
            <SearchPage
              navigator={navigator}
              maxResults={10}
              debounceDelay={500}
            />
          }
        />

        <Route
          exact path="/"
          element={
            <HomePage />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
