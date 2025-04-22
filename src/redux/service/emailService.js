import axios from "axios";

// use dotenv
const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/v1/`;

// Register User
const sendAutomatedEmail = async (emailData) => {
    const response = await axios.post(API_URL + "sendAutomatedEmail", emailData);
    return response.data.message;
};

const emailService = {
    sendAutomatedEmail,
};

export default emailService;