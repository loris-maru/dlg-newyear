<template>
  <div class="flex flex-col justify-center items-center container mx-auto pt-4">
    <div class="container mx p-4">
      <img
        src="~@/assets/title-2021.svg"
        alt="title-2021"
        class="w-screen z-0"
      />
    </div>
    <div class="videoContainer" v-if="videos">
      <video
        muted
        autoplay
        loop
        class="videoBlock"
        :src="videoLinkRandom"
      ></video>
    </div>
    <div class="tunnel-title">
      <p>
        Commencez l’année avec un peu de douceur
      </p>
    </div>
    <button class="nextVideo" @click.prevent="randomNumberGenerator">
      Video
    </button>
  </div>
</template>

<script>
import sanity from "@/sanity";
const query = `*[_type == 'videoItem']{
    title,
    videoLink
  }`;

export default {
  data() {
    return {
      videos: null,
      videoNumber: 0,
    };
  },
  computed: {
    videoLinkRandom() {
      return this.videos[this.videoNumber]?.videoLink;
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
  },
  created() {
    this.videoQueryFetch();
  },
};
</script>
<style lang="css" scoped>
@keyframes textMove {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-680vw);
  }
}

@font-face {
  font-family: "Superheat";
  src: url("~@/assets/Superheat-ExtraBold.woff") format("woff"),
    url("~@/assets/Superheat-ExtraBold.woff2") format("woff2");
}

.videoContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: white;
  top: 26vh;
  margin: 0 auto;
  width: 80vw;
  height: 80vw;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 36px 32px -14px rgba(0, 0, 0, 0.22);
}

video {
  transform: scale(1.8);
}

.tunnel-title {
  width: 100vw;
  position: relative;
  top: 22vh;
  left: 1rem;
}

p {
  font-family: "Superheat", "sans-serif";
  font-size: 42px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: white;
  white-space: nowrap;
  position: relative;
  left: 24rem;
  animation: 16s linear 1s infinite running textMove;
}

.nextVideo {
  position: absolute;
  bottom: 2.2rem;
  background: #dcb3b7;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.18);
  color: white;
  padding: 1rem 2rem;
  font-family: "Superheat", "sans-serif";
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.3);
}
</style>
