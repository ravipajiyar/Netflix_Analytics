import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001';

export const fetchNetflixData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`); // Use your api url
         return response.data;
     } catch(error){
        console.log("Error fetching data:", error);
         throw error;
    }
}

export const fetchMaturityRatingData = async () => {
     try{
        const response = await axios.get(`${API_BASE_URL}/maturity_ratings`);
         return response.data
     } catch(error){
         console.log("Error fetching maturity rating data:", error);
        throw error;
     }
}

export const fetchTopDirectors = async () => {
    try {
         const response = await axios.get(`${API_BASE_URL}/top_directors`);
         return response.data;
     } catch(error){
        console.log("Error fetching top directors:", error);
         throw error;
    }
}
export const fetchTopDirectorsByYear = async (year) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top_directors/${year}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top directors by year:", error);
        throw error;
    }
};

export const fetchTopActors = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top_actors`);
        return response.data
    } catch(error){
        console.log("Error fetching top actors:", error);
         throw error;
    }
}
export const fetchTopActorsByYear = async (year) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top_actors/${year}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top actors by year:", error);
        throw error;
    }
};

export const fetchContentTrend = async () => {
    try{
         const response = await axios.get(`${API_BASE_URL}/content_trend`);
         return response.data
    } catch (error){
         console.log("Error fetching content trend data:", error);
         throw error;
    }
}
export const fetchContentTrendByYear = async (year) => {
    try{
         const response = await axios.get(`${API_BASE_URL}/content_trend/${year}`);
         return response.data
    } catch (error){
         console.log("Error fetching content trend data by year:", error);
         throw error;
    }
}


export const fetchTopGenres = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/top_genres`);
        return response.data;
    } catch(error){
        console.log("Error fetching Top genres:", error);
        throw error;
    }
}
export const fetchTopGenresByYear = async (year) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top_genres/${year}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Top genres by year:", error);
        throw error;
    }
};


export const fetchSentimentAnalysis = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/sentiment_analysis`);
         return response.data;
     } catch(error){
         console.log("Error fetching Sentiment Analysis:", error);
         throw error
     }
}

export const fetchDurationAnalysis = async () => {
    try{
         const response = await axios.get(`${API_BASE_URL}/duration_analysis`);
        return response.data;
    } catch(error){
         console.log("Error fetching Duration Analysis:", error);
        throw error;
    }
}
export const fetchDashboardData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard_data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};

export const fetchDashboardDataByYear = async (year) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard_data/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data by year:", error);
    throw error;
  }
};