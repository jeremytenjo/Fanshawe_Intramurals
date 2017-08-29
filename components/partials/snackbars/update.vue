<template lang="html">
  <div id="snackBar_update">
Update Successful
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#snackBar_update {
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 5;
    left: 50%;
    bottom: -92px;
}

  @media screen and (min-width: 600px) {
    #snackBar_update {
      bottom: -500px;

}
  }
</style>
