<template>
  <div justify-center class="q-mx-md">
    <facebook :url="url" scale="3"></facebook>
    <whats-app :url="url" title="My food" scale="3"></whats-app>
    <pinterest :url="url" scale="3"></pinterest>
    <twitter :url="url" title="Check this out" scale="3"></twitter>
    <linkedin :url="url" scale="3"></linkedin>
    <telegram :url="url" scale="3"></telegram>
    <reddit :url="url" scale="3" title="My Food"></reddit>
    <email :url="url" subject="I love food" scale="3"></email>
  </div>
</template>

<script>
import {
  Facebook,
  Twitter,
  Linkedin,
  Pinterest,
  Reddit,
  Telegram,
  WhatsApp,
  Email
} from 'vue-socialmedia-share'
export default {
  name: 'HelloWorld',
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    WhatsApp,
    Email
  },
  props: {
    url: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello > span {
  padding: 1em;
}
</style>
