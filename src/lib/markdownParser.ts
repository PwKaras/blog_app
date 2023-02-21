import { join } from "path";
import fs from "fs";
// mater = takes a string or object with content property, extracts and parses front-matter from the string, then returns an object with data
import matter from "gray-matter";
// processor with support for parsing markdown input and serializing markdown as output
// import remark from "remark";
// plugin to add support for serializing HTML.
import html from "remark-html";
import { remark } from "remark";

export interface Data {
  [key: string]: any;
}

export interface Project {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  createdAt: number | null;
}

export interface Article extends Project {
  cover: string;
  content: string;
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
      createdAt: data.date ? Number(new Date(data.date)) : null
    };
  });
};

export const getFileBySlug = async (path: string, slug: string) => {
  const directory = join(process.cwd(), path);
  const fullPath = join(directory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content: markdownContent } = matter(fileContents);
  let content = "";
  if (markdownContent) {
    content = await (await remark().use(html).process(markdownContent)).toString();
  }
  return {
    ...data,
    content,
    slug,
    createdAt: data.date ? Number(new Date(data.date)) : null
  };
};
