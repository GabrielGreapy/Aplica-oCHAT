"use client";

import styles from "./login.module.css"
import stylesGlobal from "../page.module.css"


import LoginButton from "../components/button-login";

export default function Login(){
    
    return(
        <div className={styles["container-body-login"]}>
            <div className={styles["container-login"]}>
                <div className={styles["welcome"]}>
                    Bem vindo ao Chat-G
                </div>
                <div className={styles["login-div"]}>
                    <LoginButton />
                </div>
            </div>
        </div>
    )
}