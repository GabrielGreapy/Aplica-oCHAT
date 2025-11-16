"use client"

import { auth, db } from "@/Firebase/FirebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";




import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "@/app/login/login.module.css"

export default function LoginButton(){
    const router = useRouter();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        
        try{
            const userCredential = await signInWithPopup(auth , provider);
            const user = userCredential.user;

            const userRef = doc( db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if( docSnap.exists()){
                await updateDoc(userRef, {
                    lastLogin : new Date(),
                })
                console.log("Conta ja existe. logando")
            }
            else{
                await setDoc( doc( db, "users", user.uid), {
                    uid : user.uid, 
                    name : user.displayName,
                    email : user.email,
                    avatarURL : user.photoURL,
                    createdAt : new Date(),
                    lastLogin : new Date(),
                });
                console.log("Conta sendo criada")
            }
            console.log("Logando...")



            const idToken = await userCredential.user.getIdToken();
            await fetch('/api/session', {
                method:'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({ idToken }),
            });
            router.push("/chats");
        }
        catch(err: any){ 
            console.log(err);
        }
    }
    return(
        <button
        className={styles["loginButton"]}
        onClick={handleGoogleLogin}
        >
                Login com Google
            </button>        
    );
}