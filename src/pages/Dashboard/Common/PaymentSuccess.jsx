import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        axiosSecure.patch(`/verify-payment-success?session_id=${sessionId}`)
        .then(res => {
            console.log(res.data)
        })
    }, [sessionId, axiosSecure])

    return (
        <div>
            Payment success
        </div>
    );
};

export default PaymentSuccess;