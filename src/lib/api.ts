const API_KEY = "9AFdTcYdY8jePGsQoEhV1zk3vd3nRqHFv3P47dci4pfPeAN66vpVvBZD";
const BASE_URL = "https://api.pexels.com/v1";

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
}

export interface SearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

export const searchPhotos = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=20`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  return response.json();
};

export const getCuratedPhotos = async (page: number = 1): Promise<SearchResponse> => {
  const response = await fetch(
    `${BASE_URL}/curated?page=${page}&per_page=20`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch curated photos");
  }

  return response.json();
};