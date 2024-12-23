import { MongoClient } from 'mongodb';

export async function connectDatabase(dbName, collectionName) {
    const url = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}`;
      
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = await db.collection(collectionName);
    return collection;
}

export async function insertDocument(collection, document) {
    collection.insertOne(document);
}

export async function getDocuments(collection) {
    return collection
        .sort({_id: -1})
        .toArray();
}