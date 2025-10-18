import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileWord, FaFileImage } from "react-icons/fa";

const UserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents`);
      setDocuments(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fileIcon = (type = "") => {
    const ext = type.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-3xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500 text-3xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-green-500 text-3xl" />;
      default:
        return <FaFilePdf className="text-gray-500 text-3xl" />;
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Community Documents</h1>
        <p className="text-gray-500 mt-2">All documents shared by the Admin</p>
      </div>

      {documents.length === 0 ? (
        <p className="text-center text-gray-600 mt-16 text-lg">
          No documents available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                {fileIcon(doc.fileUrl)}
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg break-words">
                    {doc.title || doc.name || doc.filename || doc.originalname || "Untitled Document"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <a
                href={`${import.meta.env.VITE_BACKEND_URL}${doc.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-green-600 hover:underline font-semibold text-sm"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDocuments;
