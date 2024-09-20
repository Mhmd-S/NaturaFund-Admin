const normalizeSnakeCase = (objectKey) => {
    let headers = objectKey
        .split("_")
        .map((header) => header[0].toUpperCase() + header.slice(1))
        .join(" ");
    return headers;
};

const normalizeCamelCase = (objectKey) => {
    let headers = objectKey;
    headers = headers.replace(/([A-Z])/g, " $1");
    headers = headers.charAt(0).toUpperCase() + headers.slice(1);
    return headers;
};

export { normalizeSnakeCase, normalizeCamelCase };
