import { create } from "zustand";
import { dummyMembers, dummyProjects } from "../data/project";

const useProjectStore = create((set) => ({
  projects: dummyProjects,
  members: dummyMembers,
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));

export default useProjectStore;
