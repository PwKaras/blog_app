import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
// Takes a string or object with content property, extracts and parses front-matter from the string, then returns an object with data

export interface Data {
  [key: string]: any;
}

export interface Project {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  createAt: number | null;
}

export const getList = (path: string) => {
  // The process.cwd() method returns the current working directory of the Node.js process.
  const directory = join(process.cwd(), path);
  const files = fs.readdirSync(directory);

  return files.map((file) => {
    const fullPath = join(directory, file);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContents);

    // slug - is often use to generate sub page
    return {
      ...data,
      slug: file.replace(".md", ""),
      createAt: data.date ? Number(new Date(data.date)) : null
    };
  });
};
