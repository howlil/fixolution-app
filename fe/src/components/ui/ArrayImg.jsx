import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ArrayImg({ label, onSelectImages, links }) {
  const [fileNames, setFileNames] = useState([]);
  const [apiImages, setApiImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (links) {
      setApiImages(links);
      setFileNames(links.map((link) => link.split("/").pop()));
    }
  }, [links]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFileNames(files.map((file) => file.name));
      const newImages = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(newImages);
      onSelectImages(files);
    } else {
      setFileNames([]);
      setSelectedImages([]);
    }
  };

  const handleClick = () => {
    document.getElementById("images").click();
  };

  const handleRemoveImage = (index) => {
    const updatedFileNames = [...fileNames];
    const updatedSelectedImages = [...selectedImages];
    updatedFileNames.splice(index, 1);
    updatedSelectedImages.splice(index, 1);
    setFileNames(updatedFileNames);
    setSelectedImages(updatedSelectedImages);
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
          name="images"
          id="images"
          multiple
        />
        <button
          type="button"
          onClick={handleClick}
          className="py-2 px-4 mr-3 bg-base rounded-l-xl text-white"
        >
          Upload
        </button>
        <span className="text-sm text-gray-700">
        {fileNames.length > 0 ? (fileNames.join(", ").length > 30 ? fileNames.join(", ").substring(0, 30) + "..." : fileNames.join(", ")) : "Upload gambar"}          </span>
      </div>
      {selectedImages.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-wrap">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-16 h-16 mr-2 mt-2">
                <img
                  src={image}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full  p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {apiImages.length > 0 && (
        <div className="mt-2">
          <p className="font-normal text-neutral-800 text-md">Uploaded Images:</p>
          <div className="flex flex-wrap">
            {apiImages?.map((link, index) => (
              <div key={index} className="relative w-16 h-16 mr-2 mt-2">
                <img
                  src={link}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
