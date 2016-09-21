export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
    rating?: number;
    filters?: string[];
    image?: string;
}
