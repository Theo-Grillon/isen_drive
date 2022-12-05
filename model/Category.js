require('dotenv').config()
const Product = require("./Product.js")
const { MongoClient, ObjectID} = require('mongodb');

const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);
const db = client.db(dbName);
const categoriesColl = db.collection('categories');
const productsColl = db.collection('products');
let categoriesId = [];
let products;

const Category = {
    getById : async function(categoryId){
        return await categoriesColl.find({_id: new ObjectID(categoryId)}).toArray();
    },

    getAll : async function(){
        /*const categories = [
            {_id: "1", name: "Boucherie"},
            {_id: "2", name: "Boulangerie"},
            {_id: "3", name: "Produits laitiers"},
            {_id: "4", name: "Fruits & Légumes"},
            {_id: "5", name: "Bébé"},
            {_id: "6", name: "Entretien"},
        ];

        // computes category size
        for(let category of categories){
            category.size = Product.getByCategory(category._id).length;
        }*/
        let categories = await categoriesColl.find().toArray();
        for (category of categories){
            categoriesId.push(category._id.toString());
        }
        for (let data of categoriesId){
            products = await productsColl.countDocuments({categoryId: new ObjectID(data)});
            await categoriesColl.updateOne({_id: new ObjectID(data)}, {$set: {'size': products}})
        }
        return categories;
    },

    insert : async function(name){
        categoriesColl.insertOne({ name : new Object(name) })
            .then(
                res => {
                    console.log(`Category '${name}' created`);
                }
            )
    }
}

module.exports = Category;
