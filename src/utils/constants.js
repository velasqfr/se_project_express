/* global process */

export const weatherOptions = [
  //mport.meta.ur says make what's in "" relative to the folder
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },

  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "warm",
    imageUrl:
      "https://i.pinimg.com/564x/7c/97/8c/7c978cafd491f2ec3f559a68660ce9f6.jpg",
    //https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "cold",
    imageUrl:
      "https://cdn.poizon.com/pro-img/cut-img/20250328/74468aaf5b574e22ae52e8a4f814e3b7.jpg?x-oss-process=image/format,webp/resize,w_750",
    //https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://cdn-img.poizonapp.com/pro-img/cut-img/20250406/e32c905fbcb7417db721868ba306a988.jpg?x-oss-process=image/format,webp/resize,w_800,h_800",
    //https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad
  },
  {
    _id: 3,
    name: "Boots",
    weather: "cold",
    imageUrl:
      "https://img.freepik.com/premium-vector/vector-cartoon-yellow-work-boots-illustration_1258045-3932.jpg",
    //https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f
  },

  {
    _id: 4,
    name: "T-Shirt",
    weather: "warm",
    imageUrl:
      "https://newyorkornowhere.com/cdn/shop/files/NYON-New-York-Or-Nowhere-Women_s-Motto-Tee-Blue-Composite.png?v=1733331606&width=1600",
    //https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://www.supremecommunity.com/u/season/fall-winter2023/drop/supreme-r-the-north-face-r-suede-nuptse-jacket-black-0.jpg",
    //https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4
  },
  {
    _id: 6,
    name: "Sandals",
    weather: "hot",
    imageUrl:
      "https://i.pinimg.com/736x/43/c6/51/43c6512d68c91ba3e5d40599e8327c51.jpg",
  },
  {
    _id: 7,
    name: "Jersey",
    weather: "hot",
    imageUrl:
      "https://static.wixstatic.com/media/31d308_2285b3992ddf4414892627db423173a5~mv2.png/v1/fill/w_2500,h_2500,al_c/31d308_2285b3992ddf4414892627db423173a5~mv2.png",
  },
  {
    _id: 8,
    name: "Cargo",
    weather: "warm",
    imageUrl:
      "https://st4.depositphotos.com/2485347/20979/v/450/depositphotos_209791348-stock-illustration-light-brown-jogger-pants-white.jpg",
  },
  {
    _id: 9,
    name: "Shoes",
    weather: "warm",
    imageUrl:
      "https://www.kevinandkaia.com/uploads/1/2/6/1/126191832/s922489433528641189_p701_i99_w1050.png                               ",
  },
  {
    _id: 10,
    name: "Sneakers",
    weather: "hot",
    imageUrl:
      "https://i.pinimg.com/736x/33/73/b3/3373b308935a205a905ced4d3d45bc73.jpg",
  },

  {
    _id: 11,
    name: "water",
    weather: "hot",
    imageUrl:
      "https://i.pinimg.com/736x/d6/d1/fb/d6d1fb67348dbb02863b41b4399f66dc.jpg",
  },
];

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr-96.mine.bz"
    : "http://localhost:3001";

export const coordinates = {
  latitude: 40.783058,
  longitude: -73.971252,
};

//Chones, Ecuador Coordinates to test out different weather icon:
//Latitude: -0.6833333,
//longitude: -80.1

export const APIkey = "60b7c0d868aadffe04cd99623c32ceae";
export { baseUrl };
