import React from "react";

const RecentMaintenance = ({ tasks }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 mt-6">
      <h3 className="text-xl font-semibold mb-4">Maintenance Tasks</h3>
      <ul className="list-disc pl-5 space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="text-gray-700">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentMaintenance;
