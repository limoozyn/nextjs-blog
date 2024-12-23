import { connectDatabase, getDocuments, insertDocument } from "../../helpers/db-util";

export default async function handler(req, res){
    const dbName = 'my-blog';
    const collectionName = 'messages';

    let collection;
    try {
        collection = await connectDatabase(process.env.mongodb_database, collectionName);
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the db failed!' });
        return;
    }
    if(req.method === 'POST'){
        const {email, name, message} = req.body;
        if(
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ){
            res.status(422).json({message: 'Invalid Input!'});
        }
        const newMessage = {
            email,
            name,
            message
        };
        try {
            await insertDocument(collection, newMessage);
            res.status(201).json({ message: 'message added successfully!', comment: newMessage });
        } catch (error) {
            res.status(500).json({ message: 'Storing message failed!' });
        }
    } else {
        try {
            const documents = await getDocuments(collection);
        
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting comment failed!' });
        }

    }
}