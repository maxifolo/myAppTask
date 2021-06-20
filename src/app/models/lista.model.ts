import { ListaItem } from "./lista-item.model";

export class Lista {
  id: number;
  title: string;
  created: Date;
  finished: Date;
  completed: boolean;
  items: ListaItem[];
  constructor(title: string) {
    this.title = title;
    this.created = new Date();
    this.completed = false;
    this.items = [];
    this.id = new Date().getTime();
  }
}
