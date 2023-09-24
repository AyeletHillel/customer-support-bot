import express from 'express';
import chainPromise from './chat.js'; 
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());



chainPromise.then(chain => {
    app.post('/ask', async (req, res) => {
        try {
            const chat_history = req.body.chat_history;
            const question = req.body.query;
            const response = await chain.call({ question, chat_history });

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
