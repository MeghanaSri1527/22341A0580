import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import StatsPage from "./components/StatsPage";
import { logEvent } from "./utils/logger";

function RedirectPage({ urls }) {
  const { code } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const found = urls.find(u => u.shortCode === code);
    if (found && found.expiry > new Date()) {
      logEvent("RedirectSuccess", { code });
      window.location.href = found.original;
    } else {
      logEvent("RedirectFailed", { code });
      navigate("/");
    }
  }, [code, urls, navigate]);

  return <p>Redirecting...</p>;
}

function App() {
  const [urls, setUrls] = useState([]);

  const handleShorten = ({ url, validity, customCode }) => {
    const shortCode = customCode || Math.random().toString(36).substring(2, 7);
    if (urls.some(u => u.shortCode === shortCode)) {
      alert("Shortcode already exists");
      return;
    }

    const expiry = new Date(Date.now() + validity * 60 * 1000);
    const newUrl = { original: url, shortCode, expiry, clicks: [] };
    setUrls([...urls, newUrl]);
    logEvent("UrlShortened", newUrl);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: "20px" }}>
            <h1>URL Shortener</h1>
            <UrlForm onShorten={handleShorten} />
            <UrlList urls={urls} />
          </div>
        } />
        <Route path="/r/:code" element={<RedirectPage urls={urls} />} />
        <Route path="/stats" element={<StatsPage urls={urls} />} />
      </Routes>
    </Router>
  );
}

export default App;
