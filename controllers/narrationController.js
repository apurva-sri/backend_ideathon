import axios from 'axios';
const ML_URL = process.env.ML_SERVICE_URL;

export const startNarration = async (req, res) => {
  const { camera_ip } = req.body;

  try {
    const response = await axios.post(`${ML_URL}/start-narration`, {
      camera_ip: camera_ip,
      json_folder: "story_segments"
    });

    res.status(200).json({ message: 'Narration started.', data: response.data });
  } catch (error) {
    console.error('❌ Start Narration Error:', error.message);
    res.status(500).json({ error: 'Failed to start narration.' });
  }
};

export const stopNarration = async (req, res) => {
  try {
    const response = await axios.post(`${ML_URL}/stop-narration`);
    res.status(200).json({ message: 'Narration stopped.', data: response.data });
  } catch (error) {
    console.error('❌ Stop Narration Error:', error.message);
    res.status(500).json({ error: 'Failed to stop narration.' });
  }
};

export const getNarrationSummary = async (req, res) => {
  try {
    const response = await axios.get(`${ML_URL}/session-summary`);
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error('❌ Summary Fetch Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch summary.' });
  }
};
