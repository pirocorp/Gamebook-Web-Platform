const defaultHeaders = {
    Accept: "application/json"
};

async function readJson<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}.`);
    }

    return response.json() as Promise<T>;
}

export async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        credentials: "include",
        headers: defaultHeaders
    });

    return readJson<T>(response);
}

export async function postJson<TResponse, TRequest>(url: string, body: TRequest): Promise<TResponse> {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            ...defaultHeaders,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return readJson<TResponse>(response);
}
