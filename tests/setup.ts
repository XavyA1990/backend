import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Cierra conexiones previas si existen
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // Conecta con retry por si el proceso es lento
  await mongoose.connect(uri, {
    dbName: 'test',
    // bufferCommands: false, // opcional si usas mocks
  });
}, 20000); // ⬅ Aumenta el timeout aquí (muy importante)

afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.db ? await mongoose.connection.db.collections() : [];
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}, 10000); // ⬅ También con timeout extra
