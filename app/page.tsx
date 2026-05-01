export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h1 className="text-2xl font-bold mb-10">CreditEdge</h1>

        <nav className="space-y-4">
          <p className="cursor-pointer hover:text-gray-400">Dashboard</p>
          <p className="cursor-pointer hover:text-gray-400">Clients</p>
          <p className="cursor-pointer hover:text-gray-400">Analytics</p>
          <p className="cursor-pointer hover:text-gray-400">Settings</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Clients</h3>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Active Disputes</h3>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Avg Credit Score</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>

        {/* Clients Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">Clients</h3>

          <button className="bg-black text-white px-4 py-2 rounded mb-4">
            + Add Client
          </button>

          <div className="text-gray-500">
            No clients yet
          </div>
        </div>

      </main>
    </div>
  );
}