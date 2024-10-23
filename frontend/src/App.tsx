import CreateMatch from "./pages/CreateMatch";
import Match from "./pages/Match";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Gallery from "./pages/Gallery";
import AddPhotos from "./pages/AddPhotos";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto px-4 w-full max-w-[1024px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/match" element={<Match />} />
        <Route path="/create" element={<CreateMatch />} />
        <Route path="/addPhotos" element={<AddPhotos />} />
      </Routes>
    </div>
  );
}

export default App;
