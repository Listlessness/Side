export interface JikanErrorResponse {
    readonly status: 404,
    readonly type: string,
    readonly message:string
    readonly error: string,
    readonly report_url?: string
}