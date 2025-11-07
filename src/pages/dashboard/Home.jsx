import React from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import { useNavigate } from "react-router-dom";
import { CalendarDays, UserCheck, Clock, Users, Activity } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Doctors",
      icon: <UserCheck size={36} className="text-blue-600" />,
      description: "View and connect with available doctors.",
      path: "/doctors",
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Appointments",
      icon: <CalendarDays size={36} className="text-green-600" />,
      description: "Check your upcoming or past appointments.",
      path: "/appointment",
      color: "from-green-100 to-green-50",
    },
    {
      title: "History",
      icon: <Clock size={36} className="text-purple-600" />,
      description: "View your medical and appointment history.",
      path: "/history",
      color: "from-purple-100 to-purple-50",
    },
  ];

  const overviewStats = [
    { label: "Active Doctors", value: 12, icon: <UserCheck size={20} />, color: "bg-blue-100 text-blue-700" },
    { label: "Appointments Today", value: 8, icon: <CalendarDays size={20} />, color: "bg-green-100 text-green-700" },
    { label: "Total Patients", value: 145, icon: <Users size={20} />, color: "bg-yellow-100 text-yellow-700" },
    { label: "System Health", value: "Stable", icon: <Activity size={20} />, color: "bg-purple-100 text-purple-700" },
  ];

  const healthTips = [
    { title: "Stay Hydrated", tip: "Drink 8-10 glasses of water daily to keep your body healthy and fresh." },
    { title: "Regular Checkups", tip: "Visit your doctor regularly for preventive health checkups." },
    { title: "Balanced Diet", tip: "Eat a mix of fruits, vegetables, and proteins every day." },
  ];

  return (
    <Dashboardlayout activeMenue="dashboard">
      <div className="px-4 md:px-8">
        {/* Welcome Section */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to Zaib Clinic Dashboard 👋
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your appointments, doctors, and medical history efficiently.
        </p>

        {/* Overview Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {overviewStats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-blue-400`}
            >
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h2 className="text-xl font-bold text-gray-700">{stat.value}</h2>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer bg-linear-to-br ${item.color} rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full p-3 shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Health Tips Section */}
        <div className="bg-linear-to-br from-blue-50 via-white to-blue-100 rounded-2xl p-6 shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Health Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {healthTips.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
                <h3 className="text-md font-semibold text-blue-700 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-sm">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Home;
