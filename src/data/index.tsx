import Articles from "./Article-Content";

export const getArticle = (id: number) => {
  if (!id) return null;

  return Articles.find((article) => article.id === id);
};
