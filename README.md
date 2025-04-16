# 🌟 Saraha Backend

This is the backend of the **Saraha** app — an anonymous messaging platform where users can send and receive secret messages. Built using **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- User authentication (JWT-based)
- Send anonymous messages
- Receive messages from others
- Secure storage of user data
- RESTful API design
- MongoDB database integration
- Error handling and validation

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **dotenv** for environment variables
- **bcrypt** for password hashing

## 📁 Project Structure
## ⚙️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/Doha-3ed/Saraha.git

# 2. Navigate into the project folder
cd saraha-backend

# 3. Install dependencies
npm install

# 4. Create a .env file based on .env.example
cp .env.example .env

# 5. Start the server (dev)
npm run dev
📦 Environment Variables


Create a .env file and add the following:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

🧪 Testing
You can use Postman or Insomnia to test the API endpoints manually.

📤 Deployment
You can deploy this on:

Render

Railway

Vercel (backend as serverless)

Heroku (legacy)

🤝 Contributions
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

👤 Author
Doha 3ed – @Doha-3ed

📃 License
This project is licensed under the MIT License.