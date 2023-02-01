import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home route</div>} />
        <Route path="/attendees" element={<div>Attendees route</div>}/>
      </Routes>
    </div>
  );
}

export default App;
