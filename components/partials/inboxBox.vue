<template lang="html">
	<div>

<img large v-badge:6.left src="~assets/img/inbox_white.svg" alt="inbox icnon" id="inboxIcon" @click="showInbox">

</div>
</template>

<script>
import axios from '~plugins/axios';

export default {

    mounted() {
        var mc_inbox = document.querySelector('#mc_inbox'),
            // noEmail = document.querySelector('#noEmail'),
						DarkOverlay = document.querySelector('#DarkOverlay'),
            addIcon = document.querySelector('#addIcon');
            self = this;

    },
    data() {
        return {
            messages: ''

        }
    },
    methods: {

        showInbox() {       

            if (mc_inbox.style.display != 'block') {
                mc_inbox.style.display = 'block';
                DarkOverlay.style.display = 'block';
                // addIcon.style.opacity = 0;
            } else {
                mc_inbox.style.display = 'none';
                DarkOverlay.style.display = 'none';
                // addIcon.style.opacity = 1;
            }
        },
        showMessage(id) {
            console.log(id);
            mc_inbox.style.display = 'none';
            // addIcon.style.opacity = 1;
            self.$router.push('/inbox');
        }
    }
}
</script>

<style lang="scss">
#noEmail {
    margin-left: 20px;
    color: green;
    display: none;
}
#inboxIcon {
    width: 20px;
    display: none;
    cursor: pointer;
}
@media (min-width: 600px) {

    #inboxIcon {
        width: 20px;
        display: block;
        position: absolute;
        right: 74px;
        top: 27px;
        cursor: pointer;
    }
}
// #mc_inbox {
//     background-color: white;
//     width: 330px;
//     height: auto;
//     position: fixed;
//     top: 80px;
//     right: 74px;
//     border-radius: 2px;
//     box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
//     display: none;
//     z-index: 3;
//
// }
.navTriangleInbox {
    position: absolute;
    z-index: 3;
    width: 20px;
    top: -19px;
    right: 0;
}

#inboxTitle {
    margin-left: 20px;
    margin-top: 10px;
}
</style>
