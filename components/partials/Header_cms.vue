<template>
<div id="header">
    <img src="~assets/img/menuIcon.png" alt="menu icon" ref="menuIcon" id="menuIcon" @click="openMenu" />
    <p id="pageTitle"></p>
    <my-seachBox/>
    <my-inboxBox-cms/>
    <p id="logoutBtn_cms" @click="logout">Logout</p>
</div>
</template>

<script>
export default {

    mounted() {
        var nav = document.querySelector('#nav');
        var pageTitle = document.querySelector('#pageTitle');
        var addIcon = document.querySelector('#addIcon');
        var urlTitle = window.location.pathname;
        urlTitle = urlTitle.substring(1);
        urlTitle = urlTitle.charAt(0).toUpperCase() + urlTitle.slice(1);
        var self = this;

        (function sddsdd() {
            // pageTitle.innerHTML = urlTitle;
            // console.log(urlTitle);
            if (urlTitle === 'Inbox') {
              addIcon.style.display = 'none';
            }else {
              addIcon.style.display = 'block';
            }
        })();

    },
    methods: {
        openMenu() {
            var addIcon = document.querySelector('#addIcon'),
                nav = document.querySelector('#nav');

            if (nav.style.display === 'block') {
                nav.style.display = 'none';
                // addIcon.style.display = 'block';
                this.$refs.menuIcon.src = require('~assets/img/menuIcon.png');
            } else {
                this.$refs.menuIcon.src = require('~assets/img/closeIcon.png');
                nav.style.display = 'block';
                // addIcon.style.display = 'none';
            }
        },
        logout() {
            // console.log(self.$nuxt.$router);
            // self.$nuxt.$store.commit('set', false);
            // self.$nuxt.$router.push('/');
            location.reload(true);

        }
    }
}
</script>

<style scoped >
#header {
    background: #ff0000;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 42px;
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 3;
}

#menuIcon {
    width: 25px;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 15px;
}

#searchIcon {
    width: 25px;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 10px;
}

#pageTitle {
    color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 11px;
}

#logoutBtn_cms {
    color: white;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 24px;
    display: none;
}

@media (min-width: 600px) {
    #header {
        height: 155px;
        /*position: inherit;*/
        /*box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);*/
    }
    #pageTitle {
        left: 54px !important;
        top: 20px;
        display: block;
        transform: none;
    }
    #menuIcon {
        top: 23px;
    }
    #logoutBtn_cms {
        display: block;
    }
}
</style>
