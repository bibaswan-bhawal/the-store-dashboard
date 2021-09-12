import SHOP_DATA from './shop.data';
import { addCatagoryToDB, addProductToDB, getCatagoryByTitle } from '../firebase/firebase.utils';

const loadData = () => {
    SHOP_DATA.forEach(async (catagory) => {
        await addCatagoryToDB(catagory.title);
        const catagoryId = await getCatagoryByTitle(catagory.title);
        catagory.items.forEach(async (item) => {
            const product = {
                catagory: catagoryId.docs[0].id,
                name: item.name,
                price: `${item.price}`,
                imageUrl: item.imageUrl,
                quantity: "20"
            }

            addProductToDB(product);
        });

    });
}

export default loadData

