import axios from "axios"

const api = 'http://localhost:3333'
export default {
    async getAuthorization (appId:string, appKey:string) {
        return await axios.get(api+`/authroization_code/${appId}/${appKey}`)
    },

    async getPublicKey (appId:string, appKey:string, notificationCode:string) {
        return await axios.get(api+`/public_key/${appId}/${appKey}/${notificationCode}`)
    }
}