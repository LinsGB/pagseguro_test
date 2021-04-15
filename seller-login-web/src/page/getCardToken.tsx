import React, { useState, useEffect } from "react";
import PaymentService from "../service/PaymentService";
declare var PagSeguroDirectPayment: any;

export function GenerateCardToken() {
  const [cardToken, setCardToken] = useState("");
  const [appId, setAppId] = useState("");
  const [appKey, setAppKey] = useState("");

  const generateCardToken = async () => {
    const { sessionId } = (
      await PaymentService.getAuthorization(appId, appKey)
    ).data;
    console.log("SESSION => ", sessionId);
    PagSeguroDirectPayment.setSessionId(sessionId);
    PagSeguroDirectPayment.getPaymentMethods({
      amount: 1.0,
      success: (response: any) => {
        console.log("RESP => ", response);
      },
      error: (response: any) => {
        // Callback para chamadas que falharam.
      },
      complete: (response: any) => {
        // Callback para todas chamadas.
      },
    });
    PagSeguroDirectPayment.getBrand({
      cardBin: 516292,
      success: (response: any) => {
        console.log("BRAND => ", response);
      },
      error: (response: any) => {
        // Callback para chamadas que falharam.
      },
      complete: (response: any) => {
        // Callback para todas chamadas.
      },
    });
    PagSeguroDirectPayment.getInstallments({
      amount: 1.00,
      maxInstallmentNoInterest: 2,
      brand: "mastercard",
      success: (response: any) => {
        console.log("INSTALAMENTS => ", response);
      },
      error: (response: any) => {
        // Callback para chamadas que falharam.
      },
      complete: (response: any) => {
        // Callback para todas chamadas.
      },
    });
    PagSeguroDirectPayment.createCardToken({
      cardNumber: "5155901444768619", // Número do cartão de crédito
      brand: "mastercard", // Bandeira do cartão
      cvv: "574", // CVV do cartão
      expirationMonth: "02", // Mês da expiração do cartão
      expirationYear: "2029", // Ano da expiração do cartão, é necessário os 4 dígitos.
      success: (response: any) => {
        console.log("TOKEnRESP => ", response);
        setCardToken(response.card.token);
      },
      error: (response: any) => {
        console.log("ERROR => ", response);
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
      <h1>{cardToken}</h1>
    </div>
  );
}
