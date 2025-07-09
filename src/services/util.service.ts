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
}