import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PaymentService from "../service/PaymentService";
declare var PagSeguroDirectPayment: any;

export function GenerateSenderHash() {
  const [senderHash, setSenderHash] = useState("");
  const [appId, setAppId] = useState('');
  const [appKey, setAppKey] = useState('');

  const getSenderHash = async () => {
    PagSeguroDirectPayment.onSenderHashReady(
      (response: { status: string; message: any; senderHash: any }) => {
        if (response.status == "error") {
          console.log(response.message);
          return false;
        }
        console.log("HASH => ", response)
        setSenderHash(response.senderHash); 
      }
    );
  };

  const setSession = async () => {
    const sessionId = await PaymentService.getAuthorization(appId, appKey)
    PagSeguroDirectPayment.setSessionId(sessionId);
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
      <button onClick={setSession}>Get Sender Hash</button>
      <button onClick={getSenderHash}>Get Sender Hash</button><br/>
      <h1>{senderHash}</h1>
    </div>
  );
}
