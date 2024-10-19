import { useState, useEffect } from "react";

function FileInput({ isVideo }: { isVideo: number }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      alert("No file selected!");
      return;
    }
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop()!.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(fileExtension) && !isVideo) {
      alert("Invalid file type! Only JPG, JPEG, PNG files are allowed.");
      return;
    }
    if (!["mp4", "mpeg"].includes(fileExtension) && isVideo) {
      alert("Invalid file type! Only MP4 files are allowed.");
      return;
    }
    setSelectedFile(file);
    setFilePreviewUrl(URL.createObjectURL(file));
  };

  const removeSelectedImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
  };

  const handleSubmit = () => {
    const fileExtension = selectedFile!.name.split(".").pop()!.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(fileExtension) && !isVideo) {
      alert("Invalid file type! Only JPG, JPEG, PNG files are allowed.");
      return;
    }
    if (!["mp4", "mpeg"].includes(fileExtension) && isVideo) {
      alert("Invalid file type! Only MP4 files are allowed.");
      return;
    }

    if (selectedFile) {
      console.log(`${!isVideo ? "Image" : "Video"} submitted:`, selectedFile);
      alert(`${!isVideo ? "Image" : "Video"} submitted successfully!`);
    }
  };

  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  return (
    <>
      <div className="w-3/5 h-64 relative bg-slate-50 flex justify-center items-center border border-dashed border-gray-400 rounded-lg">
        {selectedFile ? (
          <>
            {!isVideo ? (
              <img
                src={filePreviewUrl!}
                alt="Selected Preview"
                className="w-full h-full object-scale-down border rounded-lg"
              />
            ) : (
              <video
                src={filePreviewUrl!}
                className="w-full h-full object-scale-down border rounded-lg"
                controls
              />
            )}

            <button
              onClick={removeSelectedImage}
              className="absolute -top-2 -right-2.5 text-white rounded-md"
            >
              <img
                src="./removeButtonIcon.png"
                alt="Remove Image"
                className="w-5 h-5 cursor-pointer"
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
                src="./addImageIcon.png"
                alt="Add Icon"
                className="mx-auto h-12 w-12 opacity-50"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <span className="text-indigo-600 font-semibold">Click</span>
                <p className="pl-1">to upload</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                {!isVideo ? "PNG, JPG, JPEG" : "Video"} file
              </p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept={!isVideo ? ".jpg, .jpeg, .png" : ".mp4"}
                className="sr-only"
                onChange={handleImageChange}
              />
            </div>
          </label>
        )}
      </div>

      {selectedFile && (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-slate-50 border-2 border-gray-400 text-black rounded-md hover:bg-slate-200"
        >
          Submit {!isVideo ? "Image" : "Video"}
        </button>
      )}
    </>
  );
}

export default FileInput;
