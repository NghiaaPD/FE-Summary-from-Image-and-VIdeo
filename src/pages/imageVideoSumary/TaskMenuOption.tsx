function TaskMenuOption({
  selectedTask,
  handleTaskChange,
}: {
  selectedTask: number;
  handleTaskChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const tasks = ["Image Summary", "Video Summary"];

  const listMenu = () => {
    return tasks.map((task, index) => {
      return (
        <option key={task} value={index} className="text-gray-900 ">
          {task}
        </option>
      );
    });
  };

  return (
    <div className="absolute top-0 right-0 w-30 mt-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Task Options:
      </label>
      <select
        value={selectedTask}
        onChange={handleTaskChange}
        className="relative w-full cursor-default rounded-md bg-white hover:bg-slate-200 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      >
        {listMenu()}
      </select>
    </div>
  );
}

export default TaskMenuOption;
