import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function FileInput({
  handleFileChange,
  removeSelectedImage,
  handleSubmit,
  filePreviewUrl,
  responseText,
  isVideo,
  isLoading,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedImage: (e: React.MouseEvent) => void;
  handleSubmit: () => void;
  filePreviewUrl: string | null;
  responseText: string | null;
  isVideo: number;
  isLoading: boolean;
}) {
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const event = { target: { files: [file] } };
      handleFileChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
    },
    [handleFileChange]
  );

  // Thiết lập dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div className="w-3/5 h-64 relative bg-slate-50 flex justify-center items-center border border-dashed border-gray-400 rounded-lg">
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
          <div
            className={`w-full h-full object-fill cursor-pointer hover:bg-slate-200 hover:shadow-md hover:rounded-lg flex flex-col justify-center items-center ${
              isDragActive ? "bg-slate-200 shadow-md rounded-lg" : ""
            }`}
            {...getRootProps()}
          >
            <img
              src="./addImageIcon.png"
              alt="Add Icon"
              className="mx-auto h-12 w-12 opacity-50"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <span className="text-indigo-600 font-semibold">
                Drag and drop
              </span>
              <p className="px-1">or</p>
              <span className="text-indigo-600 font-semibold">
                click to upload
              </span>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              {!isVideo ? "PNG, JPG, JPEG" : "MP4"} file
            </p>
            <input
              {...getInputProps()}
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
          className="mt-2 px-4 py-2 bg-white border-2 border-gray-400 text-black rounded-full hover:bg-gray-400"
        >
          Submit {!isVideo ? "Image" : "Video"}
        </button>
      )}

      {(responseText || isLoading) && (
        <div className="mt-2 p-2 w-3/4 h-64 bg-slate-50 border border-gray-400 rounded-md text-gray-900">
          {isLoading ? (
            // <div className="w-full h-full flex flex-col justify-center items-center">
            //   <div className="w-12 h-12 mx-auto border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
            //   <div className="mt-2 inset-0 flex justify-center items-center text-md text-gray-800">
            //     Loading...
            //   </div>
            // </div>
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 w-1/2 mb-2 rounded-xl"></div>
              <div className="h-4 bg-slate-200 w-5/6 mb-2 rounded-xl"></div>
              <div className="h-4 bg-slate-200 w-2/3 mb-2 rounded-xl"></div>
              <div className="h-4"></div>
              <div className="h-4 bg-slate-200 w-5/6 mb-2 rounded-xl"></div>
              <div className="h-4 bg-slate-200 w-full mb-2 rounded-xl"></div>
              <div className="h-4 bg-slate-200 w-1/2 mb-2 rounded-xl"></div>
              <div className="h-4 bg-slate-200 w-2/3 mb-2 rounded-xl"></div>
              <div className="h-4 bg-slate-200 w-1/3 mb-2 rounded-xl"></div>
              <div className="h-4"></div>
            </div>
          ) : (
            <></>
          )}
          {responseText}
        </div>
      )}
    </>
  );
}

export default FileInput;
