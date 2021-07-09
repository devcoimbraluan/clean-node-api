import { MongoClient } from "mongodb";

export const MongoHelper = {
    lient: null as MongoClient,

    async connect (uri: string) {
        this.client = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

    async disconnect (): Promise<void> {
        await this.client.close()
    }
}