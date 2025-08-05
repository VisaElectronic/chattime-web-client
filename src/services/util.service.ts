export class UtilService {
    static formatToMMDDYYYY(timestamp: Date): string {
        const date = new Date(timestamp);
        const mm = String(date.getMonth() + 1).padStart(2, '0');  // months are 0-indexed
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    static formatToYYYYMMDD(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const dd = String(date.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    }

    static formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = Math.max(0, decimals);
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    static getSupportedMimeType(): string {
        // Priority 1: MP4 with H.264 video and AAC audio codecs (best for universal compatibility)
        const mp4MimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';
        if (MediaRecorder.isTypeSupported(mp4MimeType)) {
            return mp4MimeType;
        }

        // Priority 2: WebM with VP9 codec (great for web, but not supported on iOS Safari)
        const webmMimeType = 'video/webm; codecs=vp9';
        if (MediaRecorder.isTypeSupported(webmMimeType)) {
            return webmMimeType;
        }

        // Priority 3: Fallback to the browser's default
        if (MediaRecorder.isTypeSupported('video/mp4')) {
            return 'video/mp4';
        }
        if (MediaRecorder.isTypeSupported('video/webm')) {
            return 'video/webm';
        }

        console.error('Could Not Get MimeType');
        return '';
    }
}