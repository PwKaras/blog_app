import { getList } from "@/lib/markdownParser";

export const getAllProjects = () => {
  const projects = getList("src/_projects");
  const projectWithCreateAt = projects.filter((project) => project.createAt);
  const projectWithOutCreateAt = projects.filter((project) => !project.createAt);
  const sortedProjects = projectWithCreateAt.sort((a, b) => b.createAt! - a.createAt!);
  const sortedProjectsAndProjectWithoutCreateAtOnTheEndOfList = [
    ...sortedProjects,
    ...projectWithOutCreateAt
  ];

  return sortedProjectsAndProjectWithoutCreateAtOnTheEndOfList;
};
