import constants from '../common/Constants';

export const getPopularMovie = async pageNumber => {
  try {
    const response = await fetch(
      `${constants.ApiBaseUrl}/movie/popular?api_key=${constants.ApiKey}&language=ar&page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    return {data: result};
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getUpcomingMovie = async pageNumber => {
  try {
    const response = await fetch(
      `${constants.ApiBaseUrl}/movie/upcoming?api_key=${constants.ApiKey}&language=ar&page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    return {data: result};
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getTopRatedMovie = async pageNumber => {
  try {
    const response = await fetch(
      `${constants.ApiBaseUrl}/movie/top_rated?api_key=${constants.ApiKey}&language=ar&page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    return {data: result};
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getGeners = async pageNumber => {
  try {
    const response = await fetch(
      `${constants.ApiBaseUrl}/genre/movie/list?api_key=${constants.ApiKey}&language=en&page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    return {data: result};
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getMovieDetails = async id => {
  try {
    const response = await fetch(
      `${constants.ApiBaseUrl}/movie/${id}?api_key=${constants.ApiKey}&language=en`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    return {data: result};
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getMovieCredits = async id => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${constants.ApiKey}&language=en`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    return {data: result};
  } catch (e) {
    console.log(e);
    return e;
  }
};
