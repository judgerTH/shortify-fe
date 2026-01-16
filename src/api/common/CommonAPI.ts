import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { API_RESPONSE } from "./API_RESPONSE";

export abstract class CommonAPI {
    protected axiosInstance: AxiosInstance;

    protected constructor(basePath: string) {
        this.axiosInstance = axios.create({
            baseURL: basePath,
            timeout: 10000,
        });
    }

    /* ========================
        Response Normalize
    ======================== */

    protected success<T>(res: AxiosResponse): API_RESPONSE<T> {
        // 백엔드가 공통 응답 포맷을 쓰는 경우
        if (typeof res.data?.result === "boolean") {
            return {
                result: res.data.result,
                data: res.data.data,
                reason: res.data.reason,
                status: res.status,
            };
        }

        // 일반 REST 응답
        return {
            result: true,
            data: res.data,
            status: res.status,
        };
    }
    
    protected failure<T>(error: unknown): API_RESPONSE<T> {
        if (axios.isAxiosError(error)) {
            return {
                result: false,
                reason: error.response?.data ?? error.message,
                status: error.response?.status,
                code: error.code,
            };
        }

        if (error instanceof Error) {
            return {
                result: false,
                reason: error.message,
            };
        }

        return {
            result: false,
            reason: String(error),
        };
    }


    /* ========================
        HTTP Methods
    ======================== */

    protected async get<T>(url: string, options?: any): Promise<API_RESPONSE<T>> {
        try {
            const res = await this.axiosInstance.get(url, options);
            return this.success<T>(res);
        } catch (e) {
            return this.failure<T>(e);
        }
    }

    protected async post<T>(url: string, data?: any, options?: any): Promise<API_RESPONSE<T>> {
        try {
            const res = await this.axiosInstance.post(url, data, options);
            return this.success<T>(res);
        } catch (e) {
            return this.failure<T>(e);
        }
    }

    protected async put<T>(url: string, data?: any): Promise<API_RESPONSE<T>> {
        try {
            const res = await this.axiosInstance.put(url, data);
            return this.success<T>(res);
        } catch (e) {
            return this.failure<T>(e);
        }
    }

    protected async patch<T>(url: string, data?: any): Promise<API_RESPONSE<T>> {
        try {
            const res = await this.axiosInstance.patch(url, data);
            return this.success<T>(res);
        } catch (e) {
            return this.failure<T>(e);
        }
    }

    protected async delete<T>(url: string, options?: any): Promise<API_RESPONSE<T>> {
        try {
            const res = await this.axiosInstance.delete(url, options);
            return this.success<T>(res);
        } catch (e) {
            return this.failure<T>(e);
        }
    }
}
