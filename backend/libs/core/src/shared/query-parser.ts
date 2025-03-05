export interface IQueryParser {
    query: any;
    page: number;
    limit: number;
    search: string;
}

export class QueryParser implements IQueryParser {
    public query: any;
    public page: number;
    public limit: number;
    public search: string;

    constructor(query: any) {
        this.query = { ...query };
        this.page = parseInt(query.page, 10) || 1;
        this.limit = parseInt(query.limit, 10) || 10;
        this.search = query.search;
    }
} 