<template lang="html">
<div class="scheduleContainer_page">
  <fixtures />
</div>
</template>

<script>
import fixtures from '~/components/master/fixtures.vue'

export default {
  components: {
    fixtures
  },
middleware: 'auth'
}
</script>

<style lang="scss">


</style>
