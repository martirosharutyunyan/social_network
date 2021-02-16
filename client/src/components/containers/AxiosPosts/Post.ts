import axios, { AxiosResponse } from 'axios';
export const post =async (url:string,data?:any):Promise<any> => {
    let postToBack:AxiosResponse = await axios.post(`http://localhost:5000/${url}`,data)
    return postToBack.data
}