const { MongoClient, ObjectID} = require('mongodb');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);

getCategories()
    .then(console.log)
    .catch(console.error)

async function getCategories(){
    const db = client.db(dbName)
    const categoriesColl = db.collection('categories');
    const productsColl = db.collection('products');
    let categoriesId = [];
    let categories = await categoriesColl.find().toArray();
    let products;
    for (category of categories){
        categoriesId.push(category._id.toString());
    }
    for (let data of categoriesId){
        products = await productsColl.countDocuments({categoryId: new ObjectID(data)});
        await categoriesColl.updateOne({_id: new ObjectID(data)}, {$set: {'size': products}})
    }
    return categories;
}