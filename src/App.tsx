import { Routes, Route, Link } from "react-router-dom";
import ReportFoundPage from "@/features/reports/pages/ReportFoundPage";
import ReportLostPage from "@/features/reports/pages/ReportLostPage";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/found">I found a document</Link>
        <Link to="/lost">I lost a document</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/found" element={<ReportFoundPage />} />
          <Route path="/lost" element={<ReportLostPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
