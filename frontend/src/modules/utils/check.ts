import { AxiosError } from "axios";

interface ErrorResponse {
    detail?: string;
    message?: string;
    errors?: Array<{ message?: string } | string>;
    error?: string;
}

export function check_error(error: AxiosError<ErrorResponse>): string {
    if (error.response) {
        const data = error.response.data;

        if (data?.detail) {
            return data.detail;
        }

        if (data?.message) {
            return data.message;
        }

        if (Array.isArray(data?.errors)) {
            return data.errors
                .map((err) =>
                    typeof err === "string" ? err : err.message || err
                )
                .join(", ");
        }

        if (data?.error) {
            return data.error;
        }
    } else if (error.request) {
        return "No response received from the server.";
    } else {
        return `Request error: ${error.message}`;
    }

    return "Something went wrong.";
}
