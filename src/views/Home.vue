<template>
  <div class="core-container">
    <Menu v-if="menuOpen" @closeMenu="toggleMenu" :videoItems="videos" />
    <div class="date-box">
      <h1 class="date-title">
        2021
      </h1>
      <h2 class="date-subtitle">
        #bestwishes
      </h2>
    </div>
    <div class="videoContainer" v-if="videos">
      <video muted autoplay loop :src="videoLinkRandom"></video>
    </div>
    <div class="tunnel-title">
      <p>
        Commencez l’année avec un peu de douceur
      </p>
    </div>

    <div class="interactive-box">
      <button
        class="secondary-button"
        @click.prevent="showSocialMediaPopup = true"
      >
        <img src="~@/assets/icn_share.svg" alt="icon share" />
      </button>

      <button class="nextVideo" @click.prevent="randomNumberGenerator">
        Video
      </button>
      <button class="secondary-button" @click.prevent="toggleMenu">
        <img src="~@/assets/icn_list.svg" alt="icon share" />
      </button>
    </div>
  </div>
  <div v-show="showSocialMediaPopup" :class="$style.socialMediaPopup">
    <SocialMedia :url="socialMediaShareUrl" />
    <button @click.prevent="showSocialMediaPopup = false">Cancel</button>
  </div>
</template>

<script>
import sanity from "@/sanity";
import SocialMedia from "@/components/button/SocialMedia";
const query = `*[_type == 'videoItem']{
    title,
    videoLink
  }`;

import Menu from "@/components/Menu";

export default {
  data() {
    return {
      videos: null,
      videoNumber: 0,
      menuOpen: false,
      socialMedia: ["facebook", "twitter", "linkedin"],
      showSocialMediaPopup: false,
    };
  },
  components: {
    Menu,
    SocialMedia,
  },
  computed: {
    videoLinkRandom() {
      return this.videos[this.videoNumber]?.videoLink;
    },
    socialMediaShareUrl() {
      return `${window.location.origin}${this.$route.fullPath}`;
    },
  },
  methods: {
    async videoQueryFetch() {
      try {
        const response = await sanity.fetch(query);
        this.videos = response;
      } catch (error) {
        console.log("The error is: ", error);
      }
    },
    randomNumberGenerator() {
      const randInteger = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
      };
      let randomNumber = randInteger(this.videos.length);
      console.log("Random video number is: ", randomNumber);
      this.videoNumber = randomNumber;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  created() {
    this.videoQueryFetch();
    console.log("route", this.$route, this);
  },
};
</script>
<style module>
.socialMediaPopup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 20;
}
</style>
<style lang="scss" scoped>
@font-face {
  font-family: "Superheat";
  src: url("~@/assets/Superheat-ExtraBold.woff") format("woff"),
    url("~@/assets/Superheat-ExtraBold.woff2") format("woff2");
}

.core-container {
  position: relative;
  display: flex;
  height: calc(100vh - 20px);
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  border-radius: 6px;
  padding-top: 16vh;

  @media (min-width: 768px) {
    padding-top: 8vh;
    border: none;
    background: rgb(243, 255, 108);
    background: linear-gradient(
      72deg,
      rgba(243, 255, 108, 1) 0%,
      rgba(1, 0, 104, 1) 59%,
      rgba(218, 56, 50, 1) 100%
    );
  }
}

p {
  max-width: 60%;
  margin: 0 auto;
  font-family: Helvetica, "sans-serif";
  color: white;
  font-size: 5vw;
  text-align: center;

  @media (min-width: 768px) {
    max-width: 100%;
    font-size: 20px;
    letter-spacing: 0.03em;
  }
}

.date-box {
  position: relative;
  width: 100%;
  line-height: 1.1;
  margin-bottom: 1.4rem;
}

.date-title {
  font-family: "Superheat", "sans-serif";
  font-size: 18vw;
  color: white;
  text-align: center;
  letter-spacing: 0.06em;

  @media (min-width: 768px) {
    font-size: 6vw;
  }
}

.date-subtitle {
  font-family: Helvetica, "sans-serif";
  font-size: 6vw;
  color: white;
  text-align: center;
  letter-spacing: 0.03em;

  @media (min-width: 768px) {
    font-size: 1.8vw;
  }
}

.videoContainer {
  position: relative;
  background: white;
  margin: 0 auto;
  width: 80vw;
  height: 45vw;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 36px 32px -14px rgba(0, 0, 0, 0.22);
  margin-bottom: 1.4rem;

  @media (min-width: 768px) {
    width: 40vw;
    height: 22.5vw;
    box-shadow: 0 60px 32px -30px rgba(0, 0, 0, 0.36);
  }
}

video {
  transform: scale(1.2);
}

.interactive-box {
  position: absolute;
  bottom: 2rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    width: 20%;
    bottom: 6rem;
  }
}

.secondary-button {
  display: block;
  width: 12vw;
  height: 12vw;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    189deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 100%
  );

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    box-shadow: 0 14px 22px rgba(0, 0, 0, 0);
    transition: all ease-in-out 0.3s;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 14px 22px rgba(0, 0, 0, 0.22);
    }
  }
}

.nextVideo {
  background: rgba(255, 255, 255, 0);
  border-radius: 36px;
  border: 1px solid white;
  color: white;
  padding: 1rem 2rem;
  font-family: "Superheat", "sans-serif";
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (min-width: 768px) {
    transition: all ease-in-out 0.4s;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
      box-shadow: 0 14px 22px rgba(0, 0, 0, 0.22);
    }
  }
}
</style>
