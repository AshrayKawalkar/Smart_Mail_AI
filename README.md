# 🚀 Smart Mail AI

An intelligent email assistant that generates context-aware smart replies directly within your email interface using AI. Built with a Chrome Extension, React.js frontend, and Spring Boot backend, this project enhances productivity through real-time, secure, and automated email response generation.

---

## 📌 Project Overview

This application allows users to:

* 📧 Generate AI-based email replies instantly  
* ⚡ Reply directly within the email interface  
* 🧠 Generate context-aware responses using AI  
* ⚛️ Interact through a responsive React.js interface  
* 🔐 Send secure requests to backend APIs  

---

## 🎯 Features

* 🤖 AI-powered email reply generation  
* 🌐 Chrome Extension integration  
* ⚛️ React.js frontend for user interaction  
* 🔐 Secure API communication using environment variables  
* ⚡ Real-time response generation  
* 🧩 Clean and modular full-stack architecture  
* 📬 Seamless integration with email platforms  

---

## 🛠️ Tech Stack

* **Language:** Java, JavaScript  
* **Frontend:** React.js  
* **Backend:** Spring Boot  
* **API Integration:** Gemini API  
* **Extension:** Chrome Extension (HTML, CSS, JavaScript)  
* **Build Tool:** Maven  
* **API Testing:** Postman  

---

## 🏗️ Project Structure

src/main/java/...

* controller → Handles API requests  
* service → Contains business logic  

frontend/ (React App)

* components → UI components  

extension/

* content.js → Injects AI button into email UI  
* manifest.json → Extension configuration  

---

## 🏗️ Architecture

Chrome Extension / React Frontend  
      ↓  
Spring Boot Backend  
      ↓  
Gemini AI API  

---

## 🔗 API Design

The application follows standard API design principles:

* POST → Generate AI email reply  

---

## ⚙️ Setup and Installation

### 1️⃣ Clone the Repository

git clone https://github.com/AshrayKawalkar/Smart_Mail_AI.git  

### 2️⃣ Navigate to the Project

cd Smart_Mail_AI  

### 3️⃣ Configure Environment Variables

Backend:

* GEMINI_API_KEY=your_api_key  
* GEMINI_API_URL=your_api_url  

Frontend (.env):

* REACT_APP_API_URL=http://localhost:8080  

---

### 4️⃣ Run the Backend

mvn spring-boot:run  

---

### 5️⃣ Run the Frontend

cd frontend  
npm install  
npm start  

---

### 6️⃣ Load Chrome Extension

Go to chrome://extensions/  
Enable Developer Mode  
Click "Load Unpacked"  
Select the extension folder  

---

## 🔑 Usage

* Open your email platform  
* Click on "AI Reply" button  
* Generate and insert smart replies instantly  
* (Optional) Use React UI for testing  

---

## 🔐 Security

* Environment variables used for API key protection  
* Secure backend handling of AI requests  
* No sensitive data stored on client side  

---

## 🚀 Future Improvements

* 📨 Support for multiple email platforms  
* 🧠 Improved AI context understanding  
* 🌍 Multi-language support  
* 📊 Analytics dashboard  
* 📱 Mobile compatibility  

---

## 👨‍💻 Author

**Ashray Kawalkar**  
GitHub: https://github.com/AshrayKawalkar  

---

## ⭐ Support

If you find this project useful, give it a ⭐ on GitHub!
