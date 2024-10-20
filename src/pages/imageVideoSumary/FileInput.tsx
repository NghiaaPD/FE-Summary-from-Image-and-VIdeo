import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function FileInput({
  handleFileChange,
  removeSelectedImage,
  handleSubmit,
  filePreviewUrl,
  responseText,
  isVideo,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedImage: (e: React.MouseEvent) => void;
  handleSubmit: () => void;
  filePreviewUrl: string | null;
  responseText: string | null;
  isVideo: number;
}) {
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const event = { target: { files: [file] } };
    handleFileChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
  }, [handleFileChange]);  

  // Thiết lập dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: isVideo === 1 ? { 'video/mp4': ['.mp4'] } : { 'image/': ['.jpg', '.jpeg', '.png'] },
  });

  return (
    <>
      <div className="w-3/5 h-64 relative bg-slate-50 flex justify-center items-center border border-dashed border-gray-400 rounded-lg" {...getRootProps()}>
        {filePreviewUrl ? (
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
          <div className={`w-full h-full object-scale-down border rounded-lg flex flex-col justify-center items-center ${isDragActive ? 'bg-slate-200' : ''}`}>
            <img
              src="./addImageIcon.png"
              alt="Add Icon"
              className="mx-auto h-12 w-12 opacity-50"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <span className="text-indigo-600 font-semibold">Drag and drop</span>
              <p className="pl-1">your files here or click to upload</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              {!isVideo ? "PNG, JPG, JPEG" : "Video"} file
            </p>
            <input {...getInputProps()}
                id="file-upload"
                name="file-upload"
                type="file"
                accept={!isVideo ? ".jpg, .jpeg, .png" : ".mp4"}
                className="sr-only"
                onChange={handleFileChange}
              />
          </div>
        )}
      </div>

      {filePreviewUrl && !responseText && (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-slate-50 border-2 border-gray-400 text-black rounded-md hover:bg-slate-200"
        >
          Submit {!isVideo ? "Image" : "Video"}
        </button>
      )}

      {responseText && (
        <div className="mt-2 p-2 w-3/4 h-64 bg-slate-50 border border-gray-400 rounded-md text-gray-900">
          {responseText}
        </div>
      )}
    </>
  );
}

export default FileInput;
