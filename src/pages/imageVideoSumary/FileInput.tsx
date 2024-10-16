import { useState, useEffect } from "react";

function FileInput() {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      alert("No file selected!");
      return;
    }
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop()!.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
      alert("Invalid file type! Only JPG, JPEG, PNG files are allowed.");
      return;
    }
    setSelectedImg(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const removeSelectedImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedImg(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
  };

  const handleSubmit = () => {
    if (selectedImg) {
      console.log("Image submitted:", selectedImg);
      alert("Image submitted successfully!");
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4 h-64 relative flex justify-center items-center border border-dashed border-gray-400 rounded-lg mt-5">
        {selectedImg ? (
          <>
            <img
              src={imagePreviewUrl!}
              alt="Selected Preview"
              className="w-full h-full object-scale-down border rounded-lg"
            />
            <button
              onClick={removeSelectedImage}
              className="absolute top-2 right-2 text-white rounded-md"
            >
              <img
                src="./removeButtonIcon.png"
                alt="Remove Image"
                className="w-4 h-4 cursor-pointer opacity-50 hover:opacity-100"
              />
            </button>
          </>
        ) : (
          <label
            htmlFor="file-upload"
            className="cursor-pointer hover:bg-slate-200 hover:shadow-md hover:rounded-lg flex justify-center items-center w-full h-full text-center"
          >
            <div>
              <img
                src="./imagesAddIcon.png"
                alt="Add Icon"
                className="mx-auto h-12 w-12 opacity-35"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <span className="text-indigo-600 font-semibold">
                  Upload a file
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, JPEG file
              </p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="sr-only"
                onChange={handleImageChange}
              />
            </div>
          </label>
        )}
      </div>

      {selectedImg && (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-800"
        >
          Submit Image
        </button>
      )}
    </div>
  );
}

export default FileInput;
