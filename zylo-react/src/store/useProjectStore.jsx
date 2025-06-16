import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialBoardData } from "../data/project";

const useProjectStore = create(
  persist(
    (set) => ({
      projects: [],
      members: [],
      boards: initialBoardData,
      teams: [],
      setTeams: (data) => set({ teams: data }),
      setMembers: (data) => set({ members: data }),
      setProjects: (projects) => set({ projects }),
    }),
    {
      name: "project-storage", // localStorage에 저장될 key 이름
    }
  )
);

export default useProjectStore;
