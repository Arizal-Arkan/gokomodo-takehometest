import axios from "axios";

export async function GetHeroes() {
  const URL = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=a91e0f81abe83d88efebcf3d47550f0c&hash=656c8f3341fe08af3d5b928a09dacda4&format=comic&orderBy=focDate&limit=100";

  const response = await axios.get(URL);

  return response
}

export async function GetDetail(id) {
  const URL_DETAIL = `http://gateway.marvel.com/v1/public/comics/${id}?ts=1&apikey=a91e0f81abe83d88efebcf3d47550f0c&hash=656c8f3341fe08af3d5b928a09dacda4`

  const response = await axios.get(URL_DETAIL);

  return response
}

export async function GetSearch(name) {
  const URL_DETAIL = `http://gateway.marvel.com/v1/public/comics?ts=1&apikey=a91e0f81abe83d88efebcf3d47550f0c&hash=656c8f3341fe08af3d5b928a09dacda4&format=comic&orderBy=focDate&titleStartsWith=${name}`

  const response = await axios.get(URL_DETAIL);

  return response
}
