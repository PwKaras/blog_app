import Layout from "@/components/layout";
import { Article } from "@/lib/markdownParser";
import { getArticle, getListOfArticles } from "@/services/articles";
import Head from "next/head";

// check path to be take into consideration
export const getStaticPaths = async () => {
  const articles = getListOfArticles();

  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false
  };
};

export const getStaticProps = async (req: any) => {
  const { slug } = req.params;

  const article = await getArticle(slug);
  return {
    props: { article }
  };
};

export interface ArticleProps {
  article: Article;
}
export default function ArticleComponent({ article }: ArticleProps) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <div>
        <h1 className="text-center text-3xl mb-10">{article.title}</h1>
        <div
          className="max-w-3xl mx-auto articleBody"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </Layout>
  );
}
