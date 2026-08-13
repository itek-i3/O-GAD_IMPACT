'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { checkIsAdmin } from '@/lib/checkAdmin';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        async function verifyAdmin() {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session?.user) {
                router.push('/auth/login');
                return;
            }

            const adminStatus = await checkIsAdmin(session.user.id);
            setIsAdmin(adminStatus);

            if (!adminStatus) {
                router.push('/');
            }
        }

        verifyAdmin();
    }, [router]);

    if (isAdmin === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#306CEC]"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {children}
        </div>
    );
}
