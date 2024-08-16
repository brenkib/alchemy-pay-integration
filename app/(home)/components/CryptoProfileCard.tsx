'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {formatAddress, formatBalance} from '@/lib/utils/formatters';
import {useAccount, useBalance} from 'wagmi';
import SendTransactionForm from './SendTransactionForm';
import {createOrder, getAlchemyPayToken} from "@/app/(home)/actions";
import {useState} from "react";
import {encrypt} from "@/lib/utils/encrypt";
import {buildURL} from "@/lib/utils/buildAlchemyURL";

export default function CryptoProfileCard() {
    const {address} = useAccount();
    const {data: balance} = useBalance({address});

    const [error, setError] = useState<string>();

    const handleGetAccessToken = async () => {
        try {
            const accessToken = await getAlchemyPayToken();
            await createOrder(accessToken, address as string);
        } catch (e) {
            const message = (e as Error).message;
            setError(message);
        }
    };

    return (
        <Card className='w-1/3'>
            <CardHeader className='text-center'>
                <CardTitle>Profile</CardTitle>
                <a
                    target='_blank'
                    className={"bg-blue-100 py-2 px-4 rounded-xl"}
                    href={buildURL({address: address})}>
                    Buy/Sell with AlchemyPay Page Redirect</a>
                <button
                    className={"bg-blue-100 py-2 px-4 rounded-xl"}
                    onClick={() => handleGetAccessToken()}
                >
                    Buy/Sell with AlchemyPay API Integration</button>
                <p className={"text-sm text-red-600"}>{error}</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Label>{formatAddress(address)}</Label>
                <Label>
                    Balance: {formatBalance(balance?.value)} {balance?.symbol}
                </Label>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
                <SendTransactionForm/>
            </CardFooter>
        </Card>
    );
}
