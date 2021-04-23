import React, { useState } from "react";
declare var PagSeguroDirectPayment: any;

export function GenerateSenderHash() {
  const [senderHash, setSenderHash] = useState("");
  const [errorMensage, setErrorMensage] = useState("");

  const getSenderHash = async () => {
    PagSeguroDirectPayment.onSenderHashReady(
      (response: { status: string; message: any; senderHash: any }) => {
        if (response.status == "error") {
          setErrorMensage(response.message);
        }
        setSenderHash(response.senderHash); 
      }
    );
  };

  return (
    <div>
      <button onClick={getSenderHash}>Get Sender Hash</button><br/>
      {senderHash && <h1>SENDER HASH: {senderHash}</h1>}
      {errorMensage && <h1>ERROR: {errorMensage}</h1>}
    </div>
  );
}
