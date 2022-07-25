import { user } from './stores/users'
import { anotaciones } from './stores/anotaciones'
import { initializeApp } from 'Firebase/app'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc, getDocs, query, where, doc, updateDoc  } from 'firebase/firestore'

let usuario = null
user.subscribe((value) => {
  usuario = value
})

//**************  AUTH */

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'Firebase/auth'
import { goto } from '$app/navigation'
const firebaseConfig = {
  apiKey: 'AIzaSyBnN3JG23cbzSnK7OTvH2NxALEoK4YxsNA',
  authDomain: 'anotaciones-renata.firebaseapp.com',
  projectId: 'anotaciones-renata',
  storageBucket: 'anotaciones-renata.appspot.com',
  messagingSenderId: '583782930372',
  appId: '1:583782930372:web:b05d4ad65eed5bdec83691',
}
let app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const logout = async () => {
  try {
    await signOut(auth)
    user.setUser(null)
    goto('/', { replace: true })
  } catch (error) {
    console.error(error)
  }
}

const loginconpopup = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // let credential = GoogleAuthProvider.credentialFromResult(result)
    // let token = credential.accessToken
    user.setUser(result.user)
  } catch (error) {
    console.log(error)
  }
}
onAuthStateChanged(auth, (authUser) => {
  user.setUser(authUser)
  //console.log(authUser)
  getAnotaciones()
})

// *****************FIRESTORE
const db = getFirestore(app)

const COLECTION = 'anotaciones'
const saveAnotacion = async (
  id,
  descripcion,
  categoria,
  fechaprevisto,
  fecharealizado
) => {
  try {
    const fechacreacion = Date.now()
    const userid = usuario?.uid
    let data = {
      fechacreacion,
      descripcion,
      categoria,
      fechaprevisto,
      fecharealizado,
      userid,
    }
    if (id === 0) {
      const docRef = await addDoc(collection(db, COLECTION), data)
      anotaciones.agregarAnotacion({ id: docRef.id, data })
    } else {
      const docRef = doc(db, COLECTION, id);
      await updateDoc(docRef, data);
      anotaciones.modificaranotacion({ id: docRef.id, data })
    }
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const getAnotaciones = async () => {
  try {
    let anots = []
    if (usuario) {
      const q = query(
        collection(db, COLECTION),
        where('userid', '==', usuario.uid)
      )
      const data = await getDocs(q)
      // const data = await getDocs(collection(db, COLECTION))
      data.forEach((doc) => {
        anots.push({ id: doc.id, data: doc.data() })
      })
    }
    anotaciones.setear(anots)
  } catch (error) {
    console.error(error)
  }
}

export { loginconpopup, logout, saveAnotacion }
