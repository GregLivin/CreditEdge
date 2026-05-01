"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("clients");
    if (saved) setClients(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (!name) return;
    setClients([...clients, { name }]);
    setName("");
  };

  const deleteClient = (index: number) => {
    const updated = clients.filter((_, i) => i !== index);
    setClients(updated);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h1 className="text-2xl font-bold mb-10">CreditEdge</h1>
        <nav className="space-y-4">
          <p>Dashboard</p>
          <p>Clients</p>
          <p>Analytics</p>
          <p>Settings</p>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Clients</h3>
            <p className="text-2xl font-bold">{clients.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Active Disputes</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Avg Credit Score</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>

        {/* Clients */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">Clients</h3>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={addClient}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          {/* List */}
          {clients.length === 0 ? (
            <p className="text-gray-500">No clients yet</p>
          ) : (
            <ul className="space-y-2">
              {clients.map((client, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 p-3 rounded"
                >
                  <span>{client.name}</span>
                  <button
                    onClick={() => deleteClient(index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}