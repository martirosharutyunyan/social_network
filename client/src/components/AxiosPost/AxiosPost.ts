import axios, { AxiosResponse } from 'axios';
export const post =async (url:string,data:any):Promise<any> => {
    return await axios.post(`http://localhost:5000/${url}`,data)
}