export function logEvent(eventType, details) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${eventType}: ${JSON.stringify(details)}`;
  
  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(logMessage);
  localStorage.setItem("logs", JSON.stringify(logs));
}
