interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

type NewPizza = Omit<Pizza, "id">;

interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
}

export type { Pizza, NewPizza, PizzaToUpdate, Film };
