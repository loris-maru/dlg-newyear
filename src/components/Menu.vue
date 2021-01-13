<template>
  <div class="menu-core">
    <button class="close-button" @click.prevent="$emit('closeMenu')">
      <img src="~@/assets/icn_close.svg" alt="icon close" />
    </button>
    <div class="content-item-box">
      <div
        v-for="(item, itemKey) in videoItems"
        :key="itemKey"
        class="item-style"
      >
        <h3 class="subtitle-number">{{ itemKey + 1 }}</h3>
        <h2 class="title-video">{{ item.title }}</h2>
        <div class="divider-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    videoItems: Array,
  },
};
</script>

<style lang="scss">
.menu-core {
  position: fixed;
  z-index: 20;
  top: 10px;
  left: 10px;
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  border-radius: 6px;
  background: white;
  padding: 55px 32px;
  line-height: 1.2;
}

.content-item-box {
  display: flex;
  flex-direction: column;
}

.item-style {
  display: flex;
  flex-direction: column;
}

.subtitle-number,
.title-video {
  font-family: Helvetica, "sans-serif";
}

.subtitle-number {
  font-size: 18px;
  color: #b5b5b5;
}

.title-video {
  font-size: 46px;
  color: #3c3c89;
  font-weight: bold;
}

.divider-line {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  margin: 16px 0;
}

.close-button {
  position: fixed;
  top: 30px;
  right: 34px;
  border: none;
  background: transparent;
}
</style>
