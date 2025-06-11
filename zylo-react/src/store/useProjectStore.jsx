import { create } from "zustand";
import { dummyMembers, dummyProjects, initialBoardData } from "../data/project";

const useProjectStore = create((set) => ({
  projects: dummyProjects,
  members: dummyMembers,
  boards: initialBoardData,
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));

export default useProjectStore;
