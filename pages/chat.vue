<template lang="html">
<div class="chatContainer_page">
  <chat />
</div>
</template>

<script>
import chat from '~/components/master/chat.vue';

export default {
  components: {
    chat
  },
  middleware: 'auth'

}
</script>

<style lang="scss">


</style>
