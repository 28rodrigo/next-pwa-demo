import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs,getDoc,doc,updateDoc} from "@firebase/firestore";

initializeApp( {
    apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID
 });



 const db = getFirestore();


export async function getData(){
    const dos=doc(db,"/light/statusLight")
    console.log(dos.path)
    var d=await getDoc(dos);
    return d.data()
}

export async function editData(newData:any) {
    const dos=doc(db,"/light/statusLight")
    updateDoc(dos,newData)
}