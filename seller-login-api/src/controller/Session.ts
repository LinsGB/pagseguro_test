import { Request, Response } from 'express'
import axios from 'axios'
import { toJson } from 'xml2json'

export default {
    async getSessionId (req: Request, res: Response) {
        const {appKey, appId} = req.params
        console.log("APPKEY => ", appKey)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/vnd.pagseguro.com.br.v3+xml'
            }
        };
        try {
            const response = (await axios.post(`https://ws.pagseguro.uol.com.br/sessions?appId=${appId}&appKey=${appKey}`,{},config)).data
            const sessionId = JSON.parse(toJson(response)).session.id
            res.json({sessionId})       
        } catch (error) {
            //console.log("ERROR => ", error)
            res.json({error})
        }
    }
}