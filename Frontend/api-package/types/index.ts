export enum TRequestMethod {
    GET='GET',
    POST='POST',
    DELETE='DELETE',
    PUT='PUT',
    PATH='PATCH'
};

export interface IRequest extends RequestInit {
    uri: string,
    method: TRequestMethod,
    headers?: Record<string, string>,
    queryParams?: Record<string, any>,
}
