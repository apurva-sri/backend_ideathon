import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables from .env

const ML_URL = process.env.ML_SERVICE_URL;

// ✅ Reusable Axios instance with base URL and timeout
const axiosInstance = axios.create({
  baseURL: ML_URL,
  timeout: 10000, // 10 seconds
});

// ✅ Start narration
export const startNarration = async (req, res) => {
  const { camera_ip } = req.body;
  console.log(camera_ip);
  if (!camera_ip) {
    return res.status(400).json({ error: 'Camera IP is required.' });
  }

  try {
    const response = await axiosInstance.post('/start-narration', {
      camera_ip,
      json_folder: 'story_segments',
    });

    res.status(200).json({
      message: '✅ Narration started successfully.',
      data: response.data,
    });
  } catch (error) {
    console.error('❌ Start Narration Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to start narration.',
      details: error?.response?.data || error.message,
    });
  }
};

// ✅ Stop narration
export const stopNarration = async (req, res) => {
  try {
    const response = await axiosInstance.post('/stop-narration');
    res.status(200).json({
      message: '🛑 Narration stopped successfully.',
      data: response.data,
    });
  } catch (error) {
    console.error('❌ Stop Narration Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to stop narration.',
      details: error?.response?.data || error.message,
    });
  }
};

// ✅ Get narration summary
export const getNarrationSummary = async (req, res) => {
  try {
    const response = await axiosInstance.get('/session-summary');
    res.status(200).json({
      message: '📊 Narration summary fetched successfully.',
      data: response.data,
    });
  } catch (error) {
    console.error('❌ Summary Fetch Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch summary.',
      details: error?.response?.data || error.message,
    });
  }
};

// ✅ (Optional) Ping ML service to check if it's alive
export const pingMLService = async (req, res) => {
  try {
    const response = await axiosInstance.get('/');
    res.status(200).json({
      message: '🎯 ML Service is alive.',
      data: response.data,
    });
  } catch (error) {
    console.error('❌ ML Service Ping Failed:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'ML service is not reachable.',
      details: error?.response?.data || error.message,
    });
  }
};
