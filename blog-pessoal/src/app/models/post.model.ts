// post.model.ts
export interface Post {
    id?: number;
    titulo: string;
    conteudo: string;
    autor: string;
    tema: string;
    data?: Date;
  }  