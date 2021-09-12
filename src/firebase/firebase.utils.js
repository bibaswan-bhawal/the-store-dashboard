import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAwxIQ0XeAb1ClgzRf2PBdE3IutSVzyPk",
    authDomain: "the-store-a3126.firebaseapp.com",
    projectId: "the-store-a3126",
    storageBucket: "the-store-a3126.appspot.com",
    messagingSenderId: "1089003467121",
    appId: "1:1089003467121:web:8c5a10f1bf5f1e42f346d0"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const collection = firestore.collection("product-catalogue");

export const listenForCatagories = (setData) => {
    var catagories;

    var snapshot = collection.onSnapshot((querySnapshot) => {
        catagories = querySnapshot.docs.map(doc => {
            const { title } = doc.data()
            return ({ id: doc.id, title });

        });

        setData(catagories);
    });

    return snapshot;
}

export const getCatagoryByTitle = async (title) => {
    const snapshot = await collection.where('title', '==', title).get();
    return snapshot;
}

export const getCatagoryById = async (id) => {
    const snapshot = await collection.doc(id).get();
    return snapshot;
}

export const getProductById = async (catagoryId, id) => {
    const checkCatagory = await getCatagoryById(catagoryId);

    if (checkCatagory.exists) {
        const item = await collection.doc(catagoryId).collection('items').doc(id).get();
        return item;
    }

    return null;
}

export const getProductByName = async (catagoryId, name) => {
    const checkCatagory = await getCatagoryById(catagoryId);

    if (checkCatagory.exists) {
        const snapshot = await collection.doc(catagoryId).collection('items').where('name', '==', name).get();
        return snapshot;
    }

    return null;
}

export const addProductToDB = async (product) => {
    const { catagory, name, price, imageUrl, quantity } = product;
    const item = await getProductByName(catagory, name);

    if (item && item.empty) {
        await collection.doc(catagory).collection('items').add({
            name,
            price: parseFloat(price, 10),
            imageUrl,
            quantity: parseInt(quantity, 10)
        });
    }
}

export const addCatagoryToDB = async (name) => {
    const doc = await getCatagoryByTitle(name);

    if (doc.empty) {
        await collection.add({ title: name });
    }

    return false;
}

export default firebase;