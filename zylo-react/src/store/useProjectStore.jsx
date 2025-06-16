import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialBoardData } from "../data/project";

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      members: [],
      boards: initialBoardData,
      teams: [],
      setTeams: (data) => set({ teams: data }),
      setMembers: (data) => set({ members: data }),
      setProjects: (projects) => set({ projects }),
      addProject: (project) => set({ projects: [...get().projects, project] }),
    }),
    {
      name: "project-storage",
    }
  )
);

export default useProjectStore;
