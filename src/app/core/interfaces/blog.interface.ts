export interface Blog {
    id: number;
    title: string;
    image: string;
    created_at: Date;
    description: string;
}

export interface BlogPut{
    id: number;
    title: string;
    description: string;
}