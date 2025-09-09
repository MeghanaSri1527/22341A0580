import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { logEvent } from "../utils/logger";

export default function UrlForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [customCode, setCustomCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      new URL(url);
    } catch {
      alert("Invalid URL format");
      logEvent("ValidationError", { url });
      return;
    }

    const validityMinutes = validity ? parseInt(validity) : 30;
    if (isNaN(validityMinutes) || validityMinutes <= 0) {
      alert("Validity must be a positive integer");
      logEvent("ValidationError", { validity });
      return;
    }

    const data = { url, validity: validityMinutes, customCode };
    onShorten(data);

    setUrl("");
    setValidity("");
    setCustomCode("");
    logEvent("FormSubmit", data);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <TextField
        label="Enter URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Validity (minutes)"
        type="number"
        variant="outlined"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Custom Shortcode (optional)"
        variant="outlined"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Shorten URL
      </Button>
    </form>
  );
}
