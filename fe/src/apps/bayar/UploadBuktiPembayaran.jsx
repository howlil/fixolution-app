import React, { useState } from "react";

const UploadBuktiPembayaran = ({ onFileUpload,handleSubmit }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-normal bg-gray-100 px-6 py-2 rounded-md mb-4">
        2. Upload Bukti Pembayaran
      </h2>
      <div className="flex  items-center mb-4">
        <label htmlFor="fileUpload" className="cursor-pointer">
          <div className="border-2  border-base text-base rounded-md py-2 px-4 inline-block">
            Masukan File
          </div>
          <input
            id="fileUpload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {fileName && (
          <div className="ml-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {fileName.length > 15 ? fileName.slice(0, 15) + "..." : fileName}
            </span>
          </div>
        )}
      </div>
      <button
      onClick={handleSubmit}
      className="bg-base text-white rounded-md py-2 px-4 w-full">
        Bayar
      </button>
    </div>
  );
};

export default UploadBuktiPembayaran;
