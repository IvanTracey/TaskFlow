import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../config/firebaseConfig"
import { useAppSelector } from "../store/hooks";

export default function useProfileImage() {
    // Cargo el usuario traido de Firestore
    const user = useAppSelector((s) => s.auth.user)
    const [foto, setFoto] = useState<string | null>(null)

    const guardarFoto = async ()  => {
        // Chequea que haya una sesion iniciada
        if (!user) return ;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect:[1, 1],
            quality:0.2,
            base64: true
        })
        if (!result.canceled && result.assets[0].base64) {
            const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`
            // Guardar informacion en documento
            await setDoc(
                doc(db, "users", user.uid),
                {fotoPerfil:base64String},
                {merge: true}
            )
            setFoto(base64String);
        }
    }

    const leerFoto = useCallback(async () => {
        try {
            if (!user) return
            
            // Traer el documento user
            const docSnap = await getDoc(doc(db, "users", user.uid))
            
            // Si el documento existe y si tiene foto cargada en Firestore, se carga en la app
            if (docSnap.exists() && docSnap.data().fotoPerfil) {
                setFoto(docSnap.data().fotoPerfil) 
            } else {
                setFoto(null);
            }
        } catch (error){
            console.error("Error al leer", error)
        }
    }, [])

    return {
        foto,
        guardarFoto,
        leerFoto
    };
}
