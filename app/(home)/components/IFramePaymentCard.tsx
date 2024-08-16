'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useAccount, useBalance } from 'wagmi';
import {buildURL} from "@/lib/utils/buildAlchemyURL";


export default function IFramePaymentCard() {
    const { address } = useAccount();
    return (
        <Card className='w-1/3'>
            <CardHeader className='text-center'>
                <CardTitle>Alchemy Pay IFrame</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <iframe height="500px" title="AlchemyPay On/Off Ramp Widget"
                        src={buildURL({address: address, fiatAmount: 69})}
                        allowFullScreen={true}
                        className={"block w-full h-[700px]"}
                >
                </iframe>
            </CardContent>
        </Card>
    );
}
