const checkFileSize = (file, maxSize) => {
    return file.size <= maxSize;
};

const checkFileMIME = (file) => {
    if (!file?.type && (file.type !== "image/png" || file.type !== "image/jpeg")) {
        return false;
    }
    return true;
};

const readBuffer = (file, start = 0, end = 2) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file.slice(start, end));
    });
};

const check = (headers) => {
    return (buffers, options = { offset: 0 }) =>
        headers.every((header, index) => header === buffers[options.offset + index]);
};

const checkFileType = async (file) => {
    const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const isJPEG = check([0xff, 0xd8, 0xff]);

    const buffers = await readBuffer(file, 0, 8);
    const uint8Array = new Uint8Array(buffers);

    const isPng = isPNG(uint8Array);
    const isJpeg = isJPEG(uint8Array);

    if (isPng) {
        return "png";
    } else if (isJpeg) {
        return "jpeg";
    } else {
        return "unknown";
    }
};

export const validateImage = async (file, maxSize) => {
    if (!checkFileSize(file, maxSize)) {
        return {
            valid: false,
            message: "File is too large",
        };
    }

    if (!checkFileMIME(file)) {
        return {
            valid: false,
            message: "File is not an image",
        };
    }

    const fileType = await checkFileType(file);

    if (fileType === "unknown") {
        return {
            valid: false,
            message: "File is not an image",
        };
    }

    return {
        valid: true,
        message: "",
    };
};
