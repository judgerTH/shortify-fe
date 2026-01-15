export interface API_RESPONSE<T> {
    result: boolean;
    data?: T;
    reason?: any;
    status?: number;
    code?: string;
    params?: any;
}

export interface Page<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    content: T[];
}
