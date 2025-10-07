import React from "react";

const DashboardCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`flex items-center gap-4 p-5 rounded-lg shadow ${bgColor}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
