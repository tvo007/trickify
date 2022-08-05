export interface ISampler {
    id: string;
    name: string;
    url: string;
    created_by: string;
    runtime: number;
    upload_date: string;
    created_at: string;
    updated_at: string;
}

export interface IScene {
    id: string;
    tricks: string;
    timestamp: number;
    endstamp: number;
    performed_by: string;
    upload_date: string;
    created_at: string;
    updated_at: string;
    sampler: {
        id: string;
        name: string;
        url: string;
        created_by: string;
    }
}