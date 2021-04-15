import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SellerAuthService from "../service/SellerAuthService";

export function QueryParamsDemo() {
  const [appId, setAppId] = useState("");
  const [appKey, setAppKey] = useState("");
  const [notificationCode, setNotificationCode] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    const notificationCode = query.get("notificationCode");
    console.log("NOT => ", notificationCode)
    setNotificationCode(notificationCode ? notificationCode : "");
  }, []);

  const submitToGetPublicKey = async () => {
    try {
      const { publicKey } = (
        await SellerAuthService.getPublicKey(appId, appKey, notificationCode)
      ).data;
      setPublicKey(publicKey);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  return (
    <div>
      {!publicKey && (
        <div>
          <input
            defaultValue="AppID"
            onChange={(event) => setAppId(event.target.value)}
          ></input>
          <input
            defaultValue="AppKey"
            onChange={(event) => setAppKey(event.target.value)}
          ></input>
          <button onClick={submitToGetPublicKey}>Get Public Key</button>
        </div>
      )}
      {publicKey && (
        <div>
          <h1>{publicKey}</h1>
        </div>
      )}
    </div>
  );
}
