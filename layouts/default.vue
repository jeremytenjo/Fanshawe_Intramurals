<template>
<div id="masterContainer">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <my-header/>
    <div id="contentContainer">
        <nuxt/>
    </div>
    <my-nav/>
</div>
</template>

<script>
// Load Global Compoents
require('../components/index.js');


export default {

    mounted() {
        var self = this,
            pageTitle = document.querySelector('#pageTitle'),
            backIcon = document.querySelector('#backIcon'),
            header = document.querySelector('#header');

        if (matchMedia) {
            var mq = window.matchMedia("(min-width: 600px)");
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        function WidthChange(mq) {
            if (mq.matches) {
                // console.log('Dashboard');
                pageTitle.style.display = 'none';
                backIcon.style.display = 'none';

                // header.style.backgroundColor = 'none';

                self.$router.push('/');
            } else {
                // console.log('Mobile');
                pageTitle.style.display = 'block';
                header.style.backgroundColor = 'red';
                pageTitle.innerHTML = 'Account';
                self.$router.push('/account');
            }

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
    margin-top: 32px;
    padding-bottom: 42px;
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
        position: static;
        width: 100%;
        height: auto;
        background-color: white;
        margin: 0;
        display: block;
        margin-top: 370px;
    }
}
</style>




































<style src="element-ui/lib/theme-default/index.css"></style>
