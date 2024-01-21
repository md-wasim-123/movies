import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODI0NDQyYTdlNWE5OTM2ZjFhMWMwMDQ4OGU1NjFhMiIsInN1YiI6IjY1YTRlMjIxZDA1YTAzMDBjNGE5YjI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C18tjSIkUGpJ-zhDBthYh4OCp8KsnhicQXW7VLCzJGg"
 
const headers = {
    Authorization: "bearer " + token
};

export const getMovieList = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            params,
            headers
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
