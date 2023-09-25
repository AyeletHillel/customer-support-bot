
# Customer Support Bot

The Customer Support Bot is designed to autonomously answer frequently asked questions, reducing the need for manual intervention and enhancing user experience. By leveraging state-of-the-art ML techniques, the bot provides accurate and context-aware responses.


## Technological Highlights:

* Langchain Framework: A robust framework that facilitates the creation of language models, ensuring efficient document loading, text splitting, and embeddings.
* OpenAI Embeddings: Leveraging the power of OpenAI's pre-trained models, we've embedded our textual data to capture intricate semantic relationships.
* FaissStore: An innovative vector storage solution that allows for rapid and precise retrieval of relevant information in a high dimensional spaces.
* Express.js: A minimalist web application framework that powers our server, ensuring smooth communication between the bot and users.


## Setup

### Prerequisites
- Node.js (v14 or newer)
- npm (Node Package Manager)

### Installation
- Clone the Repository
- Navigate to the Project Directory
- Install Dependencies
- Environment Configuration: 
Create a .env file in the root directory
`OPENAI_API_KEY=YOUR-API-KEY`

### Usage
- Start the Server: `node server.js`
- Testing with Postman:
Open Postman.
Set the request type to POST.
Enter the endpoint URL: http://localhost:3000/ask
In the "Body" tab, select "raw" and set the format to "JSON (application/json)".
Enter a JSON payload with your query, for example:
`
{
    "query": "How about Rome?",
    "chat_history": "Do you have a shop in Paris?\nNo, we do not have a physical store. We are an online-only retailer."
}`

Click "Send" and you should receive a response from the bot.


