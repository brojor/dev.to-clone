import axios from "axios";

interface Tag {
  name: string;
  description: string;
  color: string;
}

interface Article {
  title: string;
  bodyMarkdown: string;
  cover: File | null;
  tags: Tag[];
}

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const createArticle = (article: Article) => {
  const formData = new FormData();
  formData.append("title", article.title);
  formData.append("bodyMarkdown", article.bodyMarkdown);
  formData.append("coverImage", article.cover || "");
  formData.append("tags", JSON.stringify(article.tags));

  return api.post("/articles", formData);
};
