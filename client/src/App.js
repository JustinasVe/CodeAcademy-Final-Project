import { Route, Routes } from "react-router-dom";
import Attendees from "./pages/Attendees";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home route</div>} />
        <Route path="/attendees" element={<Attendees />}/>
      </Routes>
    </div>
  );
}

export default App;
