import { TMDB_Error_Response, DEFAULT_ERROR_MSSG } from "../../../utils";

export default function handleResponse(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = async function(...args: any) {
            return await original.apply(this, args)
                                .catch((err: TMDB_Error_Response) => {
                                            console.error("Encountered an exception - ", err);
                                            throw DEFAULT_ERROR_MSSG;
                                        });
        }
    }
    return descriptor;
}