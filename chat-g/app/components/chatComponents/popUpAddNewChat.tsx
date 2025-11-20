"use client"

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { useState} from 'react';
import { db, auth } from '@/Firebase/FirebaseConfig';
import { collection, query, addDoc, where, getDocs, serverTimestamp } from 'firebase/firestore';






interface PopUpProps{
        open : boolean;
        onClose: () => void;
}
export default function PopUpAddNewChat({ open, onClose} : PopUpProps){
    
    const [ codigoAdd, setCodigoAdd] = useState("")
    const handleAddNewChat = async () => {
        if (!codigoAdd) return;
        if(codigoAdd === auth.currentUser?.uid){
            alert("Hey, isso é o seu codigo")
            return
        }
        try{
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid','==', codigoAdd))
            
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty){
                alert("Usuario não encontrado")
                return
            }
            const usuarioLocalizado = querySnapshot.docs[0];
            const usuarioLocalizadoDados = usuarioLocalizado.data();

            const requestRef = collection(db, 'users', usuarioLocalizadoDados.uid, 'requests')

            try{ await addDoc(requestRef, {
                from : auth.currentUser?.displayName,
                fromId : auth.currentUser?.uid,
                timestamp : serverTimestamp(),
            })}catch(error){
                console.log("Algo deu errado ao tentar enviar o pedido : " + error);
                return;
            }
            
            
            // const chatsRef = collection( db, 'chats')

            // try (await addDoc(chatsRef,{
            //         participantIds: [ auth.currentUser?.uid, usuarioLocalizadoDados],
            //         participantsInfo: {
            //             [auth.currentUser?.uid] : {
            //                 name: auth.currentUser?.displayName,
            //                 avatarUrl :  auth.currentUser?.avatarUrl
            //             },
                    
            //         lastMessage : "Conversa iniciada", 
            //         lastMessageTimeStamp: serverTimestamp(),
            //         unreadCount: {
            //             [auth.currentUser?.uid] : 0 ,
            //             [usuarioLocalizado.uid] : 1, 
            //         }
            //         }
                    
            //     })
            //     console.log("Conversa criada com sucesso"),
            // )catch(error){
            //     console.log( "algo deu errado... " + error)
            // }

            console.log("Processo de pedido terminado")
            setCodigoAdd("")
            onClose()
        }catch(error){
            console.log("Erro:" + error)
        }
        
        
    }
    
  
  
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Adicionar nova conversa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insira o "ticket" (ID de usuário) da pessoa com quem você quer conversar.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="codigo"
                    label="Ticket / Código do Usuário"

                    type="text"
                    fullWidth
                    variant="standard"
                    value={codigoAdd}
                    onChange={(e) => setCodigoAdd(e.target.value)}
                >
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button
                onClick={onClose}>
                    Cancelar
                </Button>
                <Button
                onClick={handleAddNewChat}>
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>

    )

}