import { useState, useRef } from "react";
import FileInput from "./FileInput";
import TaskMenuOption from "./TaskMenuOption";
import axios, { CancelTokenSource } from "axios";

function ImageVideoSumary() {
  const [isVideo, setSelectedTask] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Operation canceled by the user.");
    }
    setSelectedTask(parseInt(e.target.value));
    setSelectedFile(null);
    setFilePreviewUrl(null);
    setResponseText(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Operation canceled by the user.");
    }

    setSelectedFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
    setResponseText(null);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    const fileExtension = selectedFile!.name.split(".").pop()!.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(fileExtension) && !isVideo) {
      alert("Invalid file type! Only JPG, JPEG, PNG files are allowed.");
      return;
    }
    if (!["mp4"].includes(fileExtension) && isVideo) {
      alert("Invalid file type! Only MP4 files are allowed.");
      return;
    }

    if (selectedFile) {
      console.log(`${!isVideo ? "Image" : "Video"} submitted:`, selectedFile);
      alert(`${!isVideo ? "Image" : "Video"} submitted successfully!`);

      const formData = new FormData();
      formData.append("file", selectedFile);

      setIsLoading(true); // Set loading state to true

      // Create a new cancel token source before making the API call
      cancelTokenSource.current = axios.CancelToken.source();

      try {
        // Call API
        const response = await axios.post(
          !isVideo
            ? "http://127.0.0.1:8000/file/upload_image"
            : "http://127.0.0.1:8000/file/upload_video",
          formData,
          {
            timeout: 3000,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            cancelToken: cancelTokenSource.current!.token,
          }
        );
        setResponseText(
          !isVideo
            ? response.data.content["<MORE_DETAILED_CAPTION>"]
            : response.data.content
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }
  };

  return (
    <div className="container relative max-w-3xl h-full mt-5 mx-auto flex flex-col items-center">
      <TaskMenuOption
        selectedTask={isVideo}
        handleTaskChange={handleTaskChange}
      />
      <FileInput
        handleFileChange={handleFileChange}
        removeSelectedImage={removeSelectedImage}
        handleSubmit={handleSubmit}
        filePreviewUrl={filePreviewUrl}
        responseText={responseText}
        isVideo={isVideo}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ImageVideoSumary;
