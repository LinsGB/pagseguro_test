import axios from "axios"
import { toJson } from 'xml2json'

const api = 'http://localhost:3333'

interface AuthorizationRequestData {
    authorizationRequest:{
        code: string,
        date: string
    }
}

interface PublicKeyRequestData {
    authorization:{
        account: {
            publcKey: string
        }
    }
}

export default {
    async getAuthorization (appId:string, appKey:string) {
        const config = {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml; charset=ISO-8859-1'
            }
        };
        const redirect = 'http://5ea654e98ebc.ngrok.io/listener'

        const body =
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<authorizationRequest>' +
            '    <reference>REF1234567</reference>' +
            '    <permissions>' +
            '        <code>CREATE_CHECKOUTS</code>' +
            '        <code>RECEIVE_TRANSACTION_NOTIFICATIONS</code>' +
            '        <code>SEARCH_TRANSACTIONS</code>' +
            '        <code>MANAGE_PAYMENT_PRE_APPROVALS</code>' +
            '        <code>DIRECT_PAYMENT</code>' +
            '    </permissions>' +
            `    <redirectURL>${redirect}</redirectURL>` +
            '    <notificationURL>https://pagseguro.uol.com.br/aplicacao/cadastro.jhtml</notificationURL>' +
            '</authorizationRequest>'
        try {
            const response = (await axios.post(`https://ws.pagseguro.uol.com.br/v2/authorizations/request/?appId=${appId}&appKey=${appKey}`, body, config)).data
            const jsonResponse: AuthorizationRequestData = JSON.parse(toJson(response))
            return {authorizationCode: jsonResponse.authorizationRequest.code}
        } catch (error) {
            console.log("ERROR =>", error)
            return {error:'ERROR'}
        }
    },

    async getPublicKey (appId:string, appKey:string, notificationCode:string) {
        try {
            const response = (await axios.get(`https://ws.pagseguro.uol.com.br/v2/authorizations/notifications/${notificationCode}?appId=${appId}&appKey=${appKey}`)).data
            const jsonResponse: PublicKeyRequestData = JSON.parse(toJson(response))
            return jsonResponse.authorization.account
        } catch (error) {
            console.log("ERROR => ", error)
            return {error:'ERROR'}
        }
    }
}