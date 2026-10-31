import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase"
import { useAppSelector } from "../store/hooks";
import { COLORS, MARGIN, SIZE } from "../constants/theme";

export default function FirebaseDemoScreen(){
    const user = useAppSelector( (s) => s.auth.user )
    const [resultado, setResultado] = useState<string>("");

    const leerTareas = async () => {
        // si no hay usuario
        if (!user) {
            console.log("No hay usuario logeado")
            setResultado("No hay usuario logueado")
            return
        }
        console.log("Leyendo tareas del usuario", user.uid)

        try {
            const q = query(
                collection(db, "task"),
                where ("userId", "==", user?.uid)
            )
            const snapshot = await getDocs(q)
            console.log(`Se encontraron ${snapshot.size} tareas: `)
            
            const lineas: string[] = []
            snapshot.forEach( (doc) => {
                const data = doc.data()
                console.log('- Documento ID:', doc.id)
                console.log('  Titulo:      ', data.title)
                console.log('  Descripción: ',data.description)
                console.log('  Categoría:   ',data.category)
                console.log('  Completada:  ',data.completed)
                console.log('  userID:      ',data.userId)
                console.log('')

                lineas.push(
                    `. ${data.title} - ${data.completed ? "V" : "Espere"} (${doc.id})`
                )
                if(snapshot.empty){
                    setResultado("No hay tareas para este usuario")
                }else{
                    setResultado(lineas.join("\n"))
                }
            })
        } catch (error: any) {
            console.log("Error al leer firestore", error)
            setResultado("Error: " + error.message)
        }
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <text style={styles.title}> Demo: Leer Firestore </text>
                <text style={styles.subtitle}> Toca el boton y mira la consola de Expo Podes ver tambien los resultados aca</text>
                <text style={styles.label}> Usuario logueado: </text>
                <text style={styles.mono}> {user?.email ?? "Nadie logueado"}</text>
                <text style={styles.label}> UID</text>
                <text style={styles.mono}> {user?.uid ?? "-"}</text>
                <TouchableOpacity style={styles.button} onPress={leerTareas}>
                    <text style={styles.buttonText}> Leer tareas de Firestore</text>
                </TouchableOpacity>
                <text style={styles.label}> Resultado: </text>
                <text style={styles.result}>{resultado || "(Toca el boton!)"}</text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: SIZE.fontLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: MARGIN.marginS,
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: SIZE.fontMedium,
    color: COLORS.text,
    marginBottom: MARGIN.marginS,
    alignSelf: 'center'
  },
  label: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },
  mono: {
  },
  button: {
    marginTop: MARGIN.marginS,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText:{
    fontSize: SIZE.fontSmall,
  },
  result:{
    fontSize: SIZE.fontSmall,
  },
});