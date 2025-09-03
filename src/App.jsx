import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getKey = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/get-key`);
      const data = await res.json();
      setKey(data.key);
      setMessage("");
    } catch (e) {
      setMessage("Could not get key. Check API URL.");
    } finally {
      setLoading(false);
    }
  };

  const validateKey = async () => {
    if (!key) return setMessage("Enter a key first.");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/validate-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      setMessage(data.message || "Error");
    } catch (e) {
      setMessage("Could not validate. Check API URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center">ScriptKeys</h1>
        <p className="text-gray-300 text-center mt-2">Generate and validate keys</p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={getKey}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Working..." : "Get Key"}
          </button>

          <input
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            placeholder="Enter key"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 outline-none font-mono"
          />

          <button
            onClick={validateKey}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60"
          >
            Validate Key
          </button>

          {message && (
            <div className="mt-3 w-full text-center text-sm bg-gray-700 rounded-xl p-3">
              {message}
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Set <code>VITE_API_URL</code> to your backend URL when deploying.</p>
        </div>
      </div>
    </div>
  );
}
