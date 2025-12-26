'use client'

import { createContext, use, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/Firebase/FirebaseConfig";

interface NotificationContextType{
    notificationAmount : number;
}

export const NotificationContext = createContext<NotificationContextType>({
    notificationAmount : 0,
})
export const useNotification = () => useContext(NotificationContext);


export const NotificationContextProvider = ({children} : {children : React.ReactNode}) => {
    const {user} = useContext( AuthContext );
    const [totalUnread, setTotalUnread] = useState(0);
    

    useEffect(() => {
        if(!user){
            setTotalUnread(0);
            document.title = "Chat-G";
            return;
        }
        const chatRef = collection(db, 'chats');
        const q = query(chatRef,
            where('usersId', "array-contains", user.uid)
        
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let count = 0;
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                if( data.usersData && data.usersData[user.uid]){
                    count += (data.usersData[user.uid].unreadCount || 0);
                };
            })
            setTotalUnread(count);
            if( count > 0){
                document.title = `(${count}) Chat-G`;
            }else{
                document.title = `Chat-G`;
            }
        })        
        return () => unsubscribe();
    }, [user])
    
    return(
        <NotificationContext.Provider value = {{notificationAmount : totalUnread}}>
            {children}
        </NotificationContext.Provider>
    )


    

}