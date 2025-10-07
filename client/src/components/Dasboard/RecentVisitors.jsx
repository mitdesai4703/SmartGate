import React from "react";

const RecentVisitors = ({ visitors }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 mt-6">
      <h3 className="text-xl font-semibold mb-4">Recent Visitors</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Visit Time</th>
            <th className="p-2">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-2">{v.name}</td>
              <td className="p-2">{v.time}</td>
              <td className="p-2">{v.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentVisitors;
