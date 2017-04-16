<template>
<div id="noTeam">
    <div id="innerNoTeam">
        <img src="~assets/img/noTeamIcon.png" alt="">
				<p>Join A Sport to continue</p>
        <router-link to="/welcome">
					<v-btn warning dark class="red white-text">Search</v-btn>
        </router-link>
    </div>
</div>
</template>
<script>
export default {
  mounted: function mounted() {
    //do something after mounting vue instance
    console.log("HERE!");
  }
}
</script>
<style lang='scss'>
#innerNoTeam {
	width: 100px;;
	height: auto;
	margin: 0 auto;
	margin-top: 100px;

	img {
	  width: 100px;
	}
}
</style>
