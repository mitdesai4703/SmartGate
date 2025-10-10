import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaTrash,
  FaCloudUploadAlt,
  FaTimes,
} from "react-icons/fa";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", uploadedBy: "", file: null });
  const [search, setSearch] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents`);
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") setFormData({ ...formData, file: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert("Please upload a file");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("uploadedBy", formData.uploadedBy);
    data.append("file", formData.file);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, data);
      setFormData({ name: "", uploadedBy: "", file: null });
      setShowForm(false);
      fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/documents/${id}`);
      fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  const fileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-4xl" />;
      case "docx":
        return <FaFileWord className="text-blue-500 text-4xl" />;
      case "jpg":
      case "png":
      case "jpeg":
      case "gif":
        return <FaFileImage className="text-green-500 text-4xl" />;
      default:
        return <FaFilePdf className="text-gray-500 text-4xl" />;
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Documents</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
        >
          <FaCloudUploadAlt className="text-lg" />
          Upload Document
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center sm:justify-end mb-6">
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Document Cards */}
      {filteredDocuments.length === 0 ? (
        <p className="text-gray-600 text-center mt-20 text-lg">
          No documents found. Upload some files to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-md rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                {fileIcon(doc.fileType)}
                <div>
                  <h2 className="font-semibold text-gray-800">{doc.name}</h2>
                  <p className="text-gray-500 text-sm">
                    Uploaded by: {doc.uploadedBy}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3 sm:mb-4">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}${doc.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 hover:underline font-semibold text-sm"
                >
                  View / Download
                </a>
                <button
                  onClick={() => deleteDocument(doc._id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Form Modal */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowForm(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 p-4 sm:p-0">
            <div className="bg-white w-full sm:w-[500px] rounded-2xl shadow-2xl p-4 sm:p-6 relative animate-fadeIn">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <FaTimes size={20} />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                <FaCloudUploadAlt className="text-teal-600" />
                Upload New Document
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Document Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="text"
                  name="uploadedBy"
                  placeholder="Uploaded By"
                  value={formData.uploadedBy}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Documents;
