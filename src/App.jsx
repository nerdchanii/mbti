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
          <Route path="/" element={<MyMbti />} />
          <Route path="/group/:groupId/add" element={<MyMbti />} />
          {/* <Route path="/result" element={<Result />} /> */}
          <Route path="/group/:groupId" element={<Group />} />
          <Route path="*" element={<h1>ERROR PAGE 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
