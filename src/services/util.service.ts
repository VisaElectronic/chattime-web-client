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
        const mm   = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const dd   = String(date.getDate()).padStart(2, '0');

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
}