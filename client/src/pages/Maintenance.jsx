import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FaTrash, FaCheck, FaPlay } from "react-icons/fa";

const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
    />
  </svg>
);

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 border-4 border-blue-400/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-blue-50">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const STATUS_TABS = [
  { key: "Scheduled", name: "Scheduled" },
  { key: "In Progress", name: "In Progress" },
  { key: "Completed", name: "Completed" },
];

const Maintenance = () => {
  const [tasks, setTasks] = useState([]);
  const [activeStatus, setActiveStatus] = useState("Scheduled");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
        formData
      );
      setFormData({
        title: "",
        category: "",
        priority: "Medium",
        description: "",
      });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}/status`,
        { status }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const priorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-600 text-white";
      case "Medium":
        return "bg-orange-500 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const taskCounts = useMemo(() => {
    return tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
  }, [tasks]);

  const filteredTasks = tasks.filter((t) => t.status === activeStatus);

  const renderTaskCard = (task) => (
    <div
      key={task._id}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          <span className="font-medium">{task.category}</span> •{" "}
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${priorityBadge(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </p>

        <p className="text-gray-600 text-sm italic mb-4">{task.description}</p>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        {task.status === "Scheduled" && (
          <button
            onClick={() => updateStatus(task._id, "In Progress")}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            <FaPlay /> Start
          </button>
        )}
        {task.status === "In Progress" && (
          <button
            onClick={() => updateStatus(task._id, "Completed")}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
          >
            <FaCheck /> Complete
          </button>
        )}
        {task.status === "Completed" && (
          <button
            onClick={() => deleteTask(task._id)}
            className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            <FaTrash /> Delete
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-inter">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Maintenance Board
          </h1>
          <p className="text-gray-600">
            Track maintenance requests and manage their status easily.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
        >
          <PlusIcon className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveStatus(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeStatus === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.name}{" "}
              <span className="font-bold">({taskCounts[tab.key] || 0})</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(renderTaskCard)
        ) : (
          <div className="text-gray-500 text-center col-span-full">
            No tasks found for {activeStatus}.
          </div>
        )}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Maintenance Task"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="Category"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
            rows="4"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition"
          >
            Add Task
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Maintenance;
