export interface Page {
  image: string;
  width: number;
}

export interface Doc {
  id: string;
  name: string;
  pages: Page[];
}
