export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
   
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    firstName: string;
    lastName: string;
    phone?: string;
} 