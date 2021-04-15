import { Router } from 'express'
import { Request, Response } from 'express'
import SellerRegisterController from './controller/SellerRegisterController'
import Session from './controller/Session'

const routes = Router()
routes.post('/notification', (req: Request, res: Response)=> {
    console.log("BODY => ", req.body)
    console.log("PARAMS => ", req.params)
    res.send('TEST')
})
routes.get('/authroization_code/:appId/:appKey', SellerRegisterController.getAuthorization)
routes.get('/public_key/:appId/:appKey/:notificationCode', SellerRegisterController.getPublicKey)
routes.get('/session/:appId/:appKey', Session.getSessionId)


export default routes