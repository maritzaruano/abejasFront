export interface ProductRequest {
    name: string;
    description: string;
    id_category: number;
}

export interface ProductUpdate {
    id: number;
    name: string;
    description: string;
    id_category: number;
}

export interface ApiResponse {
  status: string;
  message: string;
}
