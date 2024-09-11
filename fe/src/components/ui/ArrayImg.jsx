import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ArrayImg({ label, onSelectImages, links }) {
  const [fileNames, setFileNames] = useState([]);
  const [apiImages, setApiImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(links)) {
      const newApiImages = links.map((link) => {
        if (typeof link === "object" && link instanceof File) {
          // Create a local URL if it's a File object
          return URL.createObjectURL(link);
        }
        // Otherwise, assume it's a URL string from the server
        return `${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${link.foto}`;
      });

      setApiImages(newApiImages);
      setFileNames(
        links.map((link) =>
          typeof link === "object" && link instanceof File ? link.foto : link.foto
        )
      );
    }
  }, [links]);


  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFileNames = files.map((file) => file.name);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
      setApiImages((prevApiImages) => [...prevApiImages, ...newImages]);
      onSelectImages((prevFiles) => [...prevFiles, ...files]); // Store the original File objects
    }
  };

  const handleClick = () => {
    document.getElementById("images").click();
  };

  const handleRemoveImage = (index) => {
    setFileNames((prevFileNames) => prevFileNames.filter((_, i) => i !== index));
    setApiImages((prevApiImages) => prevApiImages.filter((_, i) => i !== index));
    onSelectImages((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the file
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
          {fileNames.length > 0
            ? fileNames.join(", ").length > 20
              ? fileNames.join(", ").substring(0, 20) + "..."
              : fileNames.join(", ")
            : "Upload gambar"}
        </span>
      </div>
      {apiImages.length > 0 && (
        <div className="mt-2">
          <p className="font-normal text-neutral-800 text-md">Uploaded Images:</p>
          <div className="flex flex-wrap">
            {apiImages.map((image, index) => (
              <div key={index} className="relative w-16 h-16 mr-2 mt-2">
                <img
                  src={image}
                  alt={`image-${image}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
