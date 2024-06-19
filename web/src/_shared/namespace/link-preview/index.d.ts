export namespace LinkPreviewNamespace {
    export interface MetaData {
        title: string;
        url: string;
        description: string;
    }

    export interface OpenGraphData {
        site_name: string;
        url: string;
        title: string;
        image: string;
        description: string;
    }

    export interface LinkPreviewData {
        meta: MetaData;
        og: OpenGraphData;
        images: string[];
    }
}
