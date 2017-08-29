<template lang="html">
<div class="accountContainer_page">
  <account />
</div>
</template>

<script>
import account from '~/components/master/account.vue';
export default {
  components: {
    account
  },
  middleware: 'auth'

}
</script>

<style lang="scss">


</style>
