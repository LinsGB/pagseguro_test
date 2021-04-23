//TODO: VALIDAR ERROS
//TODO: IMPEDIR GET CARD TOKEN SEM O APPID OU APPKEY
import React, { useState, useEffect } from "react";
import PaymentService from "../service/PaymentService";
declare var PagSeguroDirectPayment: any;

export function GenerateCardToken() {
  const [cardToken, setCardToken] = useState("");
  const [messageError, setMessageError] = useState("");
  const [appId, setAppId] = useState("");
  const [appKey, setAppKey] = useState("");

  const generateCardToken = async () => {
    const { sessionId } = (
      await PaymentService.getAuthorization(appId, appKey)
    ).data;
    PagSeguroDirectPayment.setSessionId(sessionId); 
    console.log("CARD NUMBER => ", process.env.REACT_APP_CARD_NUMBER)
    PagSeguroDirectPayment.createCardToken({
      cardNumber: process.env.REACT_APP_CARD_NUMBER, 
      brand: process.env.REACT_APP_CARD_BRAND, 
      cvv: process.env.REACT_APP_CARD_CVV, 
      expirationMonth: process.env.REACT_APP_CARD_EXPIRATION_MONTH, 
      expirationYear: process.env.REACT_APP_CARD_EXPIRATION_YEAR, 
      success: (response: any) => {
        setCardToken(response.card.token);
      },
      error: (response: any) => {
        console.log(response)
        setMessageError('ALGO DEU ERRADO')
      },
    });
  };

  return (
    <div>
      <input
        defaultValue="AppID"
        onChange={(event) => setAppId(event.target.value)}
      ></input>
      <input
        defaultValue="AppKey"
        onChange={(event) => setAppKey(event.target.value)}
      ></input>
      <button onClick={generateCardToken}>Get Card Token</button>
      <br />
      {cardToken && <h1>CARD TOKEN: {cardToken}</h1>}
      {messageError && <h1>MENSAGEM DE ERRO: {messageError}</h1>}
    </div>
  );
}
