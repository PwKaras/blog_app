import { getFileBySlug, getList } from "@/lib/markdownParser";

export const getListOfArticles = () => {
  const articles = getList("src/_articles");
  return articles;
};

export const getArticle = async (slug: string) => {
  const article = await getFileBySlug("src/_articles", slug);
  return article;
};
