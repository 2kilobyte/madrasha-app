"use client"
import { isAuth } from '@/lib/authCheck';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation'

interface IsAuthAliveProps {
  children: ReactNode; // Define the children prop type
}

const IsAuthAlive: React.FC<IsAuthAliveProps> = ({ children }) => {
    const router = useRouter()
    useEffect(() => {
    if (!isAuth()) {
        return router.push('/')
    }
    }, [router])
    
    return <>{children}</>;
};

export default IsAuthAlive;