import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
app.use(cors());
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => {
    res.send('hello, this is server for liftnores app');
});
app.get('/api/v1/users', (req, res) => {
    try {
        const users = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jan Doerty' },
            { id: 3, name: 'Doe Jonson' },
        ];
        return res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
app.listen(5000, () => console.log('App listening on port 5000!'));
//# sourceMappingURL=index.js.map