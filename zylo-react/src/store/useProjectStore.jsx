import { create } from "zustand";
import { dummyMembers, dummyProjects, initialBoardData } from "../data/project";

const useProjectStore = create((set) => ({
  projects: [],
  members: dummyMembers,
  boards: initialBoardData,
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));

export default useProjectStore;
