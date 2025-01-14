export interface stock {
  id: number;
  lastUpdated: string;
  name: string;
  price: number;
  symbol: string;
}

export interface user {
  id: number;
  name: string;
  password: string;
  username: string;
}
