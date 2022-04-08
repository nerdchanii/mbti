import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyMbti from "./pages/MyMbti";
import Group from "./pages/Group";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mymbti" element={<MyMbti />} />
          {/* <Route path="/result" element={<Result />} /> */}
          <Route path="/group/:id" element={<Group />} />
          <Route path="*" element={<h1>ERROR PAGE 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
