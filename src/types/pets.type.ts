export type PetsType = {
  id: number;
  category?: {
    id?: string;
    name?: string;
  };
  name?: string;
  photoUrls?: string[];
  tags?:
    | {
    id: number;
    name: string;
  }[]
    | string;
  status?: string;
}[];
