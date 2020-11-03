<template>
  <div id="app">
    <send-msg></send-msg>
  </div>
</template>

<script>
import SendMsg from "views/sendmsg/SendMsg";

export default {
  name: "App",
  components: {
    SendMsg,
  },
};
</script>

<style>
@import url("assets/css/base.css");
</style>
