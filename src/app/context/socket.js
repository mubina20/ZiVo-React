import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { serverApi } from '../../lib/config';

export function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(serverApi); // Server manzilini o'zgartiring

        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return socket;
}
