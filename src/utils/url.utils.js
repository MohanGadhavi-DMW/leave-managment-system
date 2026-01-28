import lzString from 'lz-string';

export function encodeJsonForUrl(json) {
    try {
        const jsonString = typeof json === 'string' ? json : JSON.stringify(json);
        return lzString.compressToEncodedURIComponent(jsonString);
    } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[encodeJsonForUrl] Failed:', err);
        }
        return null;
    }
}

export function decodeJsonFromUrl(encoded) {
    try {
        if (typeof encoded !== 'string' || !encoded.trim()) return null;
        const jsonString = lzString.decompressFromEncodedURIComponent(encoded);
        if (!jsonString) return null;
        return JSON.parse(jsonString);
    } catch (err) {
        return null;
    }
}
