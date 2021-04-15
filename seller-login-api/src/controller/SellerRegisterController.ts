import { Request, Response } from 'express'
import axios from 'axios'
import { toJson } from 'xml2json'

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
    async getAuthorization(req: Request, res: Response) {
        const { appKey, appId } = req.params
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
            res.json({authorizationCode: jsonResponse.authorizationRequest.code})
        } catch (error) {
            console.log("ERROR =>", error)
            res.send('ERROR')
        }
    },
    async getPublicKey(req:Request, res:Response) {
        const {notificationCode, appId, appKey} = req.params
        try {
            const response = (await axios.get(`https://ws.pagseguro.uol.com.br/v2/authorizations/notifications/${notificationCode}?appId=${appId}&appKey=${appKey}`)).data
            const jsonResponse: PublicKeyRequestData = JSON.parse(toJson(response))
            res.json(jsonResponse.authorization.account)    
        } catch (error) {
            console.log("ERROR => ", error)
            res.send("ERROR")
        }
        
    }

}