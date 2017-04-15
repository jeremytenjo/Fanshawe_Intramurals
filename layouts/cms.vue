<template>
<div id="masterContainer">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://unpkg.com/vue-multiselect@2.0.0-beta.14/dist/vue-multiselect.min.css" rel="stylesheet">
    <my-header/>
    <my-addForm/>
    <my-snackBar-update />
    <div id="contentContainer">
      <nuxt/>
    </div>
</div>
</template>

<script>
// Load Global Compoents
require('../components/cms/index.js');


export default {

    mounted() {

        var form = document.querySelector('#form');

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    // Registration was successful
                    // console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    // console.log(registration);
                }).catch(function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    overflow-x: initial;
}
select {
    display: block;
}
::-webkit-input-placeholder {
    color: white;
}
#contentContainer {
    z-index: -1;
    position: absolute;
    width: 100%;
    margin-top: 42px;
}
.backLink {
    padding-top: 10px;
    padding-left: 20px;
}
@media (min-width: 600px) {
    .backLink {
        color: red;
    }
    #contentContainer {
        width: 100%;
        background-color: white;
        margin: 0;
        display: block;
        transform: translateY(155px);
        height: calc(100vh - 155px);

    }
}
</style>




<style src="element-ui/lib/theme-default/index.css"></style>
