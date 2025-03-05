export class Pagination {
    constructor(
        public originalUrl: string,
        public baseUrl?: string,
        public itemsPerPage: number = 10
    ) {
        this.baseUrl = baseUrl || originalUrl.split('?')[0];
        const urlParams = new URLSearchParams(originalUrl.split('?')[1]);
        this.page = parseInt(urlParams.get('page') || '1', 10);
    }

    public page: number;
} 