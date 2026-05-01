"use client";

import { useEffect, useState } from "react";

type Client = {
  name: string;
  email: string;
  phone: string;
  status: string;
  score: string;
};

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    score: "",
  });

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (!form.name.trim()) return;

    setClients([...clients, form]);

    setForm({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      score: "",
    });
  };

  const deleteClient = (index: number) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  const averageScore =
    clients.length > 0
      ? Math.round(
          clients.reduce((sum, client) => sum + Number(client.score || 0), 0) /
            clients.length
        )
      : "--";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex">
        <aside className="min-h-screen w-72 bg-slate-950 p-6 text-white">
          <h1 className="mb-2 text-3xl font-bold">CreditEdge</h1>
          <p className="mb-10 text-sm text-slate-400">
            AI-powered credit management
          </p>

          <nav className="space-y-3">
            {["Dashboard", "Clients", "Analytics", "Reports", "Settings"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {item}
                </div>
              )
            )}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Dashboard</h2>
              <p className="text-slate-500">
                Manage clients, credit progress, and dispute workflows.
              </p>
            </div>

            <button className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white shadow">
              Export Report
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Total Clients</p>
              <h3 className="mt-2 text-3xl font-bold">{clients.length}</h3>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Active Cases</p>
              <h3 className="mt-2 text-3xl font-bold">
                {clients.filter((client) => client.status === "Active").length}
              </h3>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Average Credit Score</p>
              <h3 className="mt-2 text-3xl font-bold">{averageScore}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section className="rounded-2xl bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold">Add Client</h3>

              <div className="space-y-3">
                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Client name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <input
                  className="w-full rounded-xl border p-3"
                  placeholder="Credit score"
                  value={form.score}
                  onChange={(e) => setForm({ ...form, score: e.target.value })}
                />

                <select
                  className="w-full rounded-xl border p-3"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>

                <button
                  onClick={addClient}
                  className="w-full rounded-xl bg-slate-950 p-3 font-semibold text-white"
                >
                  Add Client
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow lg:col-span-2">
              <h3 className="mb-4 text-xl font-bold">Client Profiles</h3>

              {clients.length === 0 ? (
                <p className="text-slate-500">No clients added yet.</p>
              ) : (
                <div className="space-y-4">
                  {clients.map((client, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border bg-slate-50 p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold">{client.name}</h4>
                          <p className="text-sm text-slate-500">
                            {client.email || "No email"} |{" "}
                            {client.phone || "No phone"}
                          </p>
                        </div>

                        <button
                          onClick={() => deleteClient(index)}
                          className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-white p-3">
                          <p className="text-xs text-slate-500">Status</p>
                          <p className="font-semibold">{client.status}</p>
                        </div>

                        <div className="rounded-xl bg-white p-3">
                          <p className="text-xs text-slate-500">Credit Score</p>
                          <p className="font-semibold">
                            {client.score || "Not added"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-3">
                          <p className="text-xs text-slate-500">Disputes</p>
                          <p className="font-semibold">0 Active</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}