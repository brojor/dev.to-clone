import axios from "axios";

interface Tag {
  name: string;
  description: string;
  color: string;
}

interface Article {
  title: string;
  bodyMarkdown: string;
  coverImageUrl?: string;
  tags: Tag[];
}

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const createArticle = (article: Article) => {
  return api.post("/articles", article);
};
