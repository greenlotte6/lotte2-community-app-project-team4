import { create } from "zustand";
import { dummyProjects } from "../data/project";

const useProjectStore = create((set) => ({
  projects: dummyProjects,
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));

export default useProjectStore;
