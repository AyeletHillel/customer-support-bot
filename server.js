import express from 'express';
import chainPromise from './bot.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname));

app.use(express.json());


chainPromise.then(chain => {
    app.post('/ask', async (req, res) => {
        try {
            const query = req.body.query;
            const response = await chain.call({ query });
            res.json({ answer: response.text });
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error("Failed to initialize bot:", error);
});
