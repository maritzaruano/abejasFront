export interface Users {
    id: number;
    name: string;
    lastname: string;
    email: string;
    created_at: Date;
    password: string;
    status: number;
}

export interface UserPost{
    name: string;
    lastname: string;
    email: string;
}

export interface Login{
    email: string;
    password: string;
}