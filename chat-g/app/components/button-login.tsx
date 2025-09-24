"use client"

import { auth } from "@/Firebase/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "@/app/login/login.module.css"

export default function LoginButton(){
    const router = useRouter();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        
        try{
            const userCredential = await signInWithPopup(auth , provider);
            const idToken = await userCredential.user.getIdToken();
            await fetch('/api/session', {
                method:'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({ idToken }),
            });
            router.push("/");
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