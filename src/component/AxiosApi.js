
import axios from "axios"
export default function AxiosApi() {
    const api=axios.create({
        'baseURL':"http://localhost:3000/employee"
    })
    return api
}
