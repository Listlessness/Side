import { DEFAULT_ERROR_MSSG } from "../../utils/constants";
import { JikanErrorResponse } from "../../utils/interfaces";

export default function handleResponse(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = async function(...args: any) {
            return await original.apply(this, args)
                                .catch((err: JikanErrorResponse) => {
                                            console.error("Encountered an exception - ", err);
                                            throw DEFAULT_ERROR_MSSG;
                                        });
        }
    }
    return descriptor;
}