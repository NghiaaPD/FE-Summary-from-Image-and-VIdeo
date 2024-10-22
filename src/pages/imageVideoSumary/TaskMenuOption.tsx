function TaskMenuOption({
  selectedTask,
  handleTaskChange,
}: {
  selectedTask: number;
  handleTaskChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const tasks = ["Image Summary", "Video Summary"];

  const listMenu = () => {
    return tasks.map((task, index) => (
      <option key={task} value={index} className="text-gray-900">
        {task}
      </option>
    ));
  };

  return (
    <div className="w-full mb-3 sm:w-auto sm:relative sm:top-0 sm:right-0 z-50">
      <label className="block text-sm font-medium text-gray-900 mb-1">
        Task Options:
      </label>
      <select
        value={selectedTask}
        onChange={handleTaskChange}
        className="w-full sm:w-64 cursor-pointer rounded-md bg-white hover:bg-slate-100 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
      >
        {listMenu()}
      </select>
    </div>
  );
}

export default TaskMenuOption;
