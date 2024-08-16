import CryptoProfileCard from './components/CryptoProfileCard';
import IFramePaymentCard from "@/app/(home)/components/IFramePaymentCard";

export default function Home() {
    return (
        <main className='flex justify-center h-full items-stretch pt-20 pb-60 gap-12'>
            <CryptoProfileCard/>
            <IFramePaymentCard/>
        </main>
    );
}
