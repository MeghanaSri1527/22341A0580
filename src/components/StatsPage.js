import React from "react";

export default function StatsPage({ urls }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>URL Statistics</h2>
      {urls.map((u) => (
        <div key={u.shortCode}>
          <p><b>{u.shortCode}</b> → {u.original}</p>
          <p>Expiry: {u.expiry.toLocaleString()}</p>
          <p>Total Clicks: {u.clicks.length}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
