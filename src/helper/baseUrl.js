import axios from "axios";

const baseUrl = 'https://virtserver.swaggerhub.com/LOL11999333/Planner/1.0.0';


export const baseApi = axios.create({
	baseURL: baseUrl
})
