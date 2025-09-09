import React from "react";
import { logEvent } from "../utils/logger";
import { Link } from "react-router-dom";

export default function UrlList({ urls }) {
  const handleClick = (shortCode) => {
    logEvent("RedirectClick", { shortCode });
  };

  return (
    <div>
      <h3>Shortened URLs</h3>
      <ul>
        {urls.map((u) => (
          <li key={u.shortCode}>
            Original: {u.original} <br />
            Short: <Link to={`/r/${u.shortCode}`} onClick={() => handleClick(u.shortCode)}>
              {window.location.origin}/r/{u.shortCode}
            </Link> <br />
            Expires: {u.expiry.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
