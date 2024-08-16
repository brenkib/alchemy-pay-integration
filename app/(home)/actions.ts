"use server"

import {HmacUtil} from "@/lib/sign/HmacSHA256";

const TEST_API = "https://openapi-test.alchemypay.org";
const APP_SECRET = process.env.APP_SECRET as string;
const APP_ID = process.env.APP_ID as string;

export const getAlchemyPayToken = async (): Promise<string> => {
    const timestamp = Date.now().toString();
    const email = process.env.EMAIL;
    const map = {
        appid: APP_ID,
        timestamp: timestamp,
    };

    const response = await fetch(TEST_API + "/open/api/v3/merchant/getToken", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'appid': APP_ID,
            'timestamp': timestamp,
            'sign': HmacUtil.hmac256(APP_SECRET, HmacUtil.getStringToSign(map)),
        },
        body: JSON.stringify(email ? { email:  email } : { uid: crypto.randomUUID() }),
    });
    if (!response.ok) {
        throw new Error('Failed to access token');
    }
    const data = await response.json();
    if (!data.success) {
        throw new Error(data?.returnMsg || "Failed to access token");
    }
    return data?.accessToken || "";
}

export const createOrder = async (accessToken: string, address: string): Promise<string> => {
    const timestamp = Date.now().toString();
    const body = {
        "side": "BUY",
        "cryptoCurrency": "USDT",
        "address": address,
        "network": "TRX",
        "fiatCurrency": "USD",
        "amount": "100",
        "depositType": 2,
        "payWayCode": "10001",
        "timestamp": timestamp,
        "appid": APP_ID
    };

    const response = await fetch(TEST_API + "/open/api/v3/merchant/trade/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'appid': APP_ID,
            'timestamp': Date.now().toString(),
            'sign': HmacUtil.hmac256(APP_SECRET, HmacUtil.getStringToSign(body)),
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    const data = await response.json();
    if (!data.success) {
        throw new Error(data?.returnMsg || "Failed to access token");
    }
    return data?.accessToken || "";
}