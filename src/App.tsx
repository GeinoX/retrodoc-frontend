import { Routes, Route, Link } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ReportFoundPage from "@/pages/ReportFoundPage";
import ReportLostPage from "@/pages/ReportLostPage";
import NotFoundPage from "@/pages/NotFoundPage";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/found" element={<ReportFoundPage />} />
          <Route path="/lost" element={<ReportLostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
