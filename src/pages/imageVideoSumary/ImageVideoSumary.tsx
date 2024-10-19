import { useState } from "react";
import FileInput from "./FileInput";
import TaskMenuOption from "./TaskMenuOption";

function ImageVideoSumary() {
  const [isVideo, setSelectedTask] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    setSelectedFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
    setResponseText(null);
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
      setResponseText("This is a sample response text from the API.");
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
      />
    </div>
  );
}

export default ImageVideoSumary;
