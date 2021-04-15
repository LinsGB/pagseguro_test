import axios from "axios"

const api = 'http://localhost:3333'
export default {
    async getAuthorization (appId:string, appKey:string) {
        return await axios.get(api+`/session/${appId}/${appKey}`)
    }
}