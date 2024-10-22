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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="w-full sm:w-3/4 lg:w-1/2 h-64 relative bg-slate-50 flex justify-center items-center border border-dashed border-gray-400 rounded-lg mx-auto">
        {filePreviewUrl ? (
          <>
            {!isVideo ? (
              <img
                src={filePreviewUrl!}
                alt="Selected Preview"
                className="w-full h-full object-contain border rounded-lg"
              />
            ) : (
              <video
                src={filePreviewUrl!}
                className="w-full h-full object-contain border rounded-lg"
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
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mx-auto block"
        >
          Submit {!isVideo ? "Image" : "Video"}
        </button>
      )}

      {(responseText || isLoading) && (
        <div className="mt-4 p-4 w-full sm:w-3/4 lg:w-1/2 h-auto min-h-64 bg-slate-50 border border-gray-400 rounded-md text-gray-900 mx-auto">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-3 bg-slate-200 w-1/2 rounded-xl"></div>
              <div className="h-3 bg-slate-200 w-5/6 rounded-xl"></div>
              <div className="h-3 bg-slate-200 w-2/3 rounded-xl"></div>
              <div className="h-3"></div>
              <div className="h-3 bg-slate-200 w-full rounded-xl"></div>
              <div className="h-3 bg-slate-200 w-2/3 rounded-xl"></div>
              <div className="h-3 bg-slate-200 w-1/3 rounded-xl"></div>
              <div className="h-3"></div>
            </div>
          ) : (
            <p>{responseText}</p>
          )}
        </div>
      )}
    </>
  );
}

export default FileInput;
