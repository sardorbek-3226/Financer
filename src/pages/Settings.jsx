import Navbar from "../components/Navbar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Settings</h1>
      <p className="text-gray-700">Settings page content will go here.</p>
    </div>
  );
}
