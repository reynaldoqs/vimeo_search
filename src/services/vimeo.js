import axios from "axios";
import { VIMEO_API, VIMEO_TOKEN } from "../config";

export const getVideos = (queryParams) => {
  return axios.get(VIMEO_API + "/videos", {
    headers: {
      Authorization: `bearer ${VIMEO_TOKEN}`,
    },
    params: {
      ...queryParams,
    },
  });
};
export const getVideo = (videoId) => {
  return axios.get(VIMEO_API + videoId, {
    headers: {
      Authorization: `bearer ${VIMEO_TOKEN}`,
    },
  });
};
