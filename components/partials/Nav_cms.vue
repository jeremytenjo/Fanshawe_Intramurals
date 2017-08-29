<template>
<div fluid="fluid" id="nav">
    <img src="~assets/img/triangle.svg" alt="search icon" class="navTriangle" />
    <div class="navCons">
        <div xs4="xs4" class="navItem" @click="closeMenu('Teams')">
            <router-link to="/teams">
                <div class="navImgText">
                    <img src="~assets/img/team.svg" alt="search icon" class="navImg1" />
                    <p class="navText">Teams</p>
                </div>
            </router-link>
        </div>
        <div xs4="xs4" class="navItem" @click="closeMenu('Tournaments')">
            <router-link to="/tournaments">
                <div class="navImgText2">
                    <img src="~assets/img/tournament.svg" alt="search icon" class="navImg2" />
                    <p class="navText">Tournament</p>
                </div>
            </router-link>
        </div>
        <div xs4="xs4" class="navItem" @click="closeMenu('Users')">
            <router-link to="/users">
                <div class="navImgText3">
                    <img src="~assets/img/users.svg" alt="search icon" class="navImg3" />
                    <p class="navText">Users</p>
                </div>
            </router-link>
        </div>
    </div>

    <div class="navCons">
        <div xs4="xs4" class="navItem" @click="closeMenu('Inbox')">
            <router-link to="/inbox_cms">
                <div class="navImgText4">
                    <img src="~assets/img/inbox.svg" alt="search icon" class="navImg4" />
                    <p class="navText">Inbox</p>
                </div>
            </router-link>
        </div>
        <div xs4="xs4" class="navItem" @click="closeMenu('Announcements')">
            <router-link to="/announcements">
                <div class="navImgText5">
                    <img src="~assets/img/announce.svg" alt="search icon" class="navImg5" />
                    <p class="navText">Announce</p>
                </div>
            </router-link>
        </div>
        <!-- <div xs4="xs4" class="navItem" @click="closeMenu('Account')">
            <router-link to="/account">
                <div class="navImgText6">
                    <img src="~assets/img/settings.svg" alt="search icon" class="navImg6" />
                    <p class="navText">Account</p>
                </div>
            </router-link>
        </div> -->
    </div>
</div>
</template>

<script  type="text/javascript">
export default {
    mounted() {
        var nav = document.querySelector('#nav');
        var menuIcon = document.querySelector('#menuIcon');
        var pageTitle = document.querySelector('#pageTitle');
    },
    methods: {
        closeMenu(title) {
            pageTitle.innerHTML = title;
            nav.style.display = 'block';
            menuIcon.src = require('~/assets/img/menuIcon.png');
            self.$store.commit('setUrlPage', title);

        }
    }
}
</script>

<style lang="scss" scoped>
.navTriangle {
    position: fixed;
    z-index: 3;
    width: 20px;
    top: 61px;
    display: none;
}
#nav {
    width: 100%;
    position: fixed;
    height: 250px;
    // display: none;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
    top: 42px;
    z-index: 4;
    background-color: white;
    // grid-template-columns: 1px 1fr ;
}
.navCons {
  // margin: 0;
  // width: 100%;
  // margin-left: 0 !important;
  display: grid;
grid-template-columns: 1fr 1fr 1fr;
}
.navItem {
    border-style: solid;
    border-width: thin;
    border-color: #E0E0E0;
    border-top: none;
    border-left: none;
    border-right: none;

    padding: 0;
    height: 125px;
    position: relative;
}

.navImgText {
    color: #424242;
    text-decoration: none;
    text-decoration-line: none;
    width: 50%;
    height: 50%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

}
.navImgText2 {
    @extend .navImgText;
    transform: translateY(10px);
}
.navImgText3 {
    @extend .navImgText;
    transform: translateY(10px);
}
.navImgText4 {
    @extend .navImgText;
    transform: translateY(10px);
}
.navImgText5 {
    @extend .navImgText;
}
.navImgText6 {
    @extend .navImgText;
}

.navImg1 {
    width: 40px;
    margin: 0 auto;
    display: block;
}

.navImg2 {
    width: 30px;
    margin: 0 auto;
    display: block;
    transform: translateY(-3px);
}

.navImg3 {
    width: 23px;
    margin: 0 auto;
    display: block;
    margin-bottom: 6px;
}

.navImg4 {
    width: 30px;
    margin: 0 auto;
    display: block;
    margin-bottom: 9px;
    transform: translateY(3px);

}

.navImg5 {
    width: 30px;
    margin: 0 auto;
    display: block;
    margin-bottom: 20px;
    transform: translateY(14px);

}

.navImg6 {
    width: 30px;
    margin: 0 auto;
    display: block;
    margin-bottom: 20px;
    transform: translateY(14px);

}

.navText {
    text-align: center;
    transform: translateY(-7px);
    font-weight: bold;
    font-size: 10px;
}
@media (min-width: 400px) {
    .navText {
        font-size: 13px;
    }
}
@media (min-width: 600px) {
    #nav {
        width: 600px;
        background-color: white;
        top: 80px;
        left: 23px;
        position: fixed;


    }
    .navTriangle {
        display: block;
    }
}
</style>
