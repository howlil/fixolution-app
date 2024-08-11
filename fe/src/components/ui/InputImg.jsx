import { useState,useEffect } from "react";

export default function InputImg({ label, onSelectImage, linkImage }) {
  const [fileName, setFileName] = useState("");
  const [apiImage, setApiImage] = useState("");

  useEffect(() => {
    if (linkImage) {
      setApiImage(linkImage);
      setFileName(linkImage.split('/').pop()); 
    }
  }, [linkImage]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onSelectImage(file);
    } else {
      setFileName("Error");
    }
  };

  const handleClick = () => {
    document.getElementById("image").click();
  };

  return (
    <div className="flex flex-col">
      <label className="font-normal text-neutral-800 text-md mb-2">{label}</label>
      <div className="flex items-center border rounded-xl border-neutral-900">
        <input
          className="hidden"
          type="file"
          onChange={handleChange}
          accept="image/*"
          name="image"
          id="image"
          required={!apiImage} // Conditionally required
        />
        <button type="button" onClick={handleClick} className="py-2 px-4 mr-3 bg-base rounded-l-xl text-white">
          Upload
        </button>
        <span className="text-sm text-gray-700">
          {fileName ? fileName : "Upload gambar"}
        </span>
      </div>
    </div>
  );
}
