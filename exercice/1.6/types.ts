interface Film {
  id: number;
  title: string;
  direction: string;
  duration: number;
}

type NewFilm = Omit<Film, "id">;

export type { Film, NewFilm };
