import { useState } from "react";
import FileInput from "./FileInput";
import TaskMenuOption from "./TaskMenuOption";

function ImageVideoSumary() {
  const [selectedTask, setSelectedTask] = useState<number>(0);

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTask(parseInt(e.target.value));
  };

  return (
    <div className="container relative max-w-3xl mt-5 mx-auto flex flex-col justify-center items-center">
      <TaskMenuOption
        selectedTask={selectedTask}
        handleTaskChange={handleTaskChange}
      />
      <FileInput isVideo={selectedTask} />
    </div>
  );
}

export default ImageVideoSumary;
