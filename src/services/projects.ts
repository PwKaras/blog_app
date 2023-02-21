import { getList } from "@/lib/markdownParser";

export const getAllProjects = () => {
  const projects = getList("src/_projects");
  const projectWithCreatedAt = projects.filter((project) => project.createdAt);
  const projectWithOutCreatedAt = projects.filter((project) => !project.createdAt);
  const sortedProjects = projectWithCreatedAt.sort((a, b) => b.createdAt! - a.createdAt!);
  const sortedProjectsAndProjectWithoutCreatedAtOnTheEndOfList = [
    ...sortedProjects,
    ...projectWithOutCreatedAt
  ];

  return sortedProjectsAndProjectWithoutCreatedAtOnTheEndOfList;
};
