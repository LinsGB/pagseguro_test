import axios from "axios"

const api = 'http://localhost:3333'

export default {
    async getAuthorization (appId:string, appKey:string) {
        try {
            return (await axios.get(api + `/authroization_code/${appId}/${appKey}`)).data.authorizationCode
        } catch (error) {
            return error
        }
    },

    async getPublicKey (appId:string, appKey:string, notificationCode:string) {
        try {
            const response = (await axios.get(api+`/public_key/${appId}/${appKey}/${notificationCode}`)).data
            console.log("RESP => ", response)
        } catch (error) {
            return error
        }
    }
}