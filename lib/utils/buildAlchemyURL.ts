import {encrypt} from "@/lib/utils/encrypt";

export const buildURL = (
    {
        address,
        crypto = "USDT",
        network = "ETH",
        fiat = "EUR",
        /*Alchemy min amount is 50.03 on test instance*/
        fiatAmount = 51,
    }
    : {
        address?: string;
        crypto?: string;
        network?: string;
        fiat?: string;
        fiatAmount?: number;
    }): string => {
    const url = new URL("https://ramptest.alchemypay.org/");
    url.searchParams.append('appId', process.env.NEXT_PUBLIC_APP_ID as string);
    if (crypto) {
        url.searchParams.append('crypto', crypto);
    }
    if (network) {
        url.searchParams.append('network', network);
    }
    if (fiat) {
        url.searchParams.append('fiat', fiat);
    }
    if (fiatAmount) {
        url.searchParams.append('fiatAmount', fiatAmount.toString());
    }

    if (address) {
        url.searchParams.append('address', address as string);
        const plaintext = `address=${address}&appId=${process.env.NEXT_PUBLIC_APP_ID}`;
        url.searchParams.append('sign', encrypt(plaintext, process.env.NEXT_PUBLIC_APP_SECRET as string))
    }

    return url.toString();
};