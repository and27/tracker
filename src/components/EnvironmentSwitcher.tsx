import { useEffect, useState } from "react";
import Button from "./Button";
import { addWorkspace, getWorkspaces } from "../utils/supabaseDB";

const EnvironmentSwitcher = () => {
  const [workspaces, setWorkspaces] = useState<string[]>([]);
  const [currentSpace, setCurrentSpace] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState("");
  const user = localStorage.getItem("userId") as string;

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const { data, error } = await getWorkspaces(user);
      if (error) {
        console.error("Error fetching workspaces:", error);
        return;
      }

      if (data) {
        const workspaces = data.map((workspace: any) => workspace.name);
        setWorkspaces(workspaces);
        setCurrentSpace(workspaces[0]);
      }
    };

    fetchWorkspaces();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "add_new") {
      setIsAdding(true);
    } else {
      setCurrentSpace(selectedValue);
      setIsAdding(false);
    }
  };

  const handleAddWorkspace = async () => {
    if (newWorkspace.trim() !== "" && !workspaces.includes(newWorkspace)) {
      setCurrentSpace(newWorkspace);
      addWorkspace(user, newWorkspace);
      setWorkspaces([...workspaces, newWorkspace]);
    }
    setIsAdding(false);
    setNewWorkspace("");
  };

  return (
    <div className="relative">
      <select
        className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        value={isAdding ? "add_new" : currentSpace}
      >
        {workspaces.map((env) => (
          <option key={env} value={env}>
            {env}
          </option>
        ))}
        <option value="add_new">➕ Add workspace</option>
      </select>

      {isAdding && (
        <div className="bg-neutral-800 flex gap-2 p-3 absolute mt-2 right-0 rounded-md shadow-md">
          <input
            type="text"
            className="text-neutral-800 border border-neutral-600 px-2 py-1 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del workspace"
            value={newWorkspace}
            onChange={(e) => setNewWorkspace(e.target.value)}
          />
          <Button onClick={handleAddWorkspace}>Agregar</Button>
        </div>
      )}
    </div>
  );
};

export default EnvironmentSwitcher;
