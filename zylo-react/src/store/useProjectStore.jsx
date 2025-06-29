import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      members: [],
      tasks: [],
      teams: [],
      setTeams: (data) => set({ teams: data }),
      setMembers: (data) => set({ members: data }),
      setProjects: (projects) => set({ projects }),
      setTasks: (tasks) => set({ tasks }),
      addProject: (project) => set({ projects: [...get().projects, project] }),
      addTask: (task) => set({ tasks: [...get().tasks, task] }),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      removeTeam: (memberId) =>
        set((state) => ({
          members: state.tasks.filter((team) => team.id !== memberId),
        })),
    }),
    {
      name: "project-storage",
    }
  )
);

export default useProjectStore;
