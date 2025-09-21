"use client";

import { auth } from "@/Firebase/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

import styles from "./login.module.css"
import stylesGlobal from "../page.module.css"
export default function Login(){
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
        <div className={styles["container-body-login"]}>
            <div className={styles["container-login"]}>
                <div className={styles["welcome"]}>
                    Bem vindo ao Chat-G
                </div>
                <div className={styles["login-div"]}>
                    <button
                    className={styles["loginButton"]}
                    onClick={handleGoogleLogin}
                    >
                        Login com Google
                    </button>
                </div>
            </div>
        </div>
    )
}