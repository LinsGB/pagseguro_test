import React, { useState, useEffect } from 'react';
import SellerAuthService from '../service/SellerAuthService'
  
export function Register() {
    const [appId, setAppId] = useState('');
    const [appKey, setAppKey] = useState('');

    const redirectToPagseguroRegister = async () => {
        try {
            const {authorizationCode} = (await SellerAuthService.getAuthorization(appId, appKey)).data
            console.log("authorizationCode => ", authorizationCode)
            window.location.href = `https://pagseguro.uol.com.br/v2/authorization/request.jhtml?code=${authorizationCode}`
        } catch (error) {
            console.log("ERROR => ", error)
        }
    }
    
    return (
      <div>
          <input defaultValue="AppID" onChange={(event)=> setAppId( event.target.value)}></input>
          <input defaultValue="AppKey" onChange={(event)=> setAppKey( event.target.value)}></input>
          <button onClick={redirectToPagseguroRegister}>Register</button>
         
      </div>
    );
  }