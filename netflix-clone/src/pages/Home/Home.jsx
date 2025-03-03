import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import axios from "../../utils/axios.js";
import requests from "../../utils/requests.js";

const Home = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="home">
      <Navbar />
      
      {/* Banner Section with Dynamic Background */}
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="banner_description">
            {truncate(movie?.overview, 150)}
          </p>
          <div className="banner_buttons">
            <button className="banner_button play">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="banner_button">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* TitleCards Section */}
      <div className="title-cards-container">
        <TitleCards />
      </div>

      {/* More Cards Section */}
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for you"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;