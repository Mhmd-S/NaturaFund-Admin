const extractHeader = (objectKey) => {
    let headers = objectKey
        .split("_")
        .map((header) => header[0].toUpperCase() + header.slice(1))
        .join(" ");
    return headers;
};

export default extractHeader;
