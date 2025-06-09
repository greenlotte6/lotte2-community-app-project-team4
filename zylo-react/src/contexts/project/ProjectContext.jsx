import React, { createContext, useState } from "react";

const projectContext = createContext();

const ProjectContext = ({ children }) => {
  const [projects, setProjects] = useState();

  return <div>ProjectContext</div>;
};

export default ProjectContext;
