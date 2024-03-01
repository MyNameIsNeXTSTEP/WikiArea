import { IRequest } from "./types";

class APIRequest {
    constructor(private request: IRequest) {
        this.request = request;
    }
    public async doRequest<ResponseData>(): Promise<any> {
        const baseURL = 'http://localhost:3000';
        const requestConfig = this.getConfig(this.request);
        try {
            const { uri, queryParams } = this.request;
            const params = new URLSearchParams(queryParams);
            const response = await fetch(
                `${baseURL}${uri}?${params}`,
                requestConfig,
            );
            const payload = await response.json();
            return {
                isSuccess: true,
                payload,
            };
        } catch (e) {
            console.error(e, '__REQ_ERR__');
            return {
                isSuccess: false,
                error: {
                    code: '',
                    message: e.message,
                },
            };
        }
    }
    private getConfig(request: IRequest): RequestInit {
        const { headers, method, body } = request;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
        const requestConfig: RequestInit = {
            method,
            headers: {
                ...defaultHeaders,
                ...headers,
            },
        };
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            requestConfig.body = body;
        }
        return requestConfig;
    }

    public async postTask() {
    }
}

export default APIRequest;