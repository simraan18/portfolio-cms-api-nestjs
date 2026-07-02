interface ResponseList<T>{
    data: T[];
    total: number;
    message?: string = "OK";
}

interface ResponseData<T>{
    data: T
    message?: string = "OK";
}

interface ApiTokenPayload{
    id: string;
    email: string;
}