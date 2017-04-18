<template>
<div id="masterContainer">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <my-snackBar-update/>

    <!-- Header -->
    <div v-if="clientORcms === 'student'">
        <my-header/>
        <my-nav/>
    </div>

    <div v-else>
        <my-header-cms/>
        <my-addForm/>
        <my-nav-cms/>
        <my-inboxBox/>
    </div>

    <!-- Content Conainer -->
    <div v-if="clientORcms === 'student'">
        <div id="contentContainer">
            <nuxt/>
        </div>
    </div>

    <div v-else>
        <div id="contentContainer_cms">
            <nuxt/>
        </div>
    </div>


</div>
</template>

<script>
// Load Global Compoents
require('../components/index.js');


export default {
    data() {
        return {
            clientORcms: this.$store.state.clientORcms
        }
    },
    mounted() {
        var self = this,
            masterContainer = document.querySelector('#masterContainer'),
            pageTitle = document.querySelector('#pageTitle'),
            backIcon = document.querySelector('#backIcon'),
            header = document.querySelector('#header');


        //set master conainer settings
        if (this.$store.state.clientORcms === 'student') {
            // masterContainer.style.position = 'static';
        }else if (this.$store.state.clientORcms === 'cms') {
          // masterContainer.style.position = 'absolute';
          // masterContainer.style.width = '100%';
          // masterContainer.style.height = '100vh';
          // masterContainer.style.zIndex = 3;
        }

        // console.log(self.$store.state.clientORcms);

        if (self.$store.state.clientORcms === 'student') {
            var x = document.getElementsByTagName("HTML")[0];
            x.style.overflow = 'scroll';

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

                    // masterContainer.style.position = 'static';

                    // header.style.backgroundColor = 'none';

                    self.$router.push('/');
                } else {
                    // console.log('Mobile');
                    // masterContainer.style.position = 'static';
                    // masterContainer.style.zIndex = 3;

                    pageTitle.style.display = 'block';
                    header.style.backgroundColor = 'red';
                    pageTitle.innerHTML = 'Account';
                    self.$router.push('/account');
                }

            }

            //if user has no team redirect to no team page
            // console.log("HERE!");
            // console.log(self.$store.state.userData.team);
            if (self.$store.state.userData.tournaments.length === 0) {
                self.$router.push('/noTeam');
            } else if (self.$store.state.userData.team === null) {
                self.$router.push('/freeAgent');
            }
        } else if (self.$store.state.clientORcms === 'cms') {

            var x = document.getElementsByTagName("HTML")[0];
            x.style.overflow = 'hidden';

            self.$router.push('/users');
        }



    }
}
</script>

<style lang="scss">
// Global Styles
body {
    margin: 0;
    overflow: hidden;
    z-index: -1;
}

select {
    display: block;
}
::-webkit-input-placeholder {
    color: white;
}

.hidden {
    display: none !important;
}

.overflowScroll {
    overflow: scroll;
    overflow-x: hidden;
    padding-bottom: 40px;
}

.material-icons {
    color: #5F5F5F;
}
.md-input-container {
    display: block;
}
.pointer {
    cursor: pointer;
}
.alignLeft {
    text-align: left;
}
.alignCenter {
    text-align: center;
}
.md-theme-default.md-button:not([disabled]).md-primary:not(.md-icon-button) {
  color: #009587 !important;
}
.btn {
  height: 34px;
  font-size: 12px;
  min-width: 54px;
}
#masterContainer {
    // z-index: 3;
    // width: 100%;
    // height: 100%;
    // height: 100vh;
    // position: absolute;
}
#contentContainer {
    z-index: -1;
    position: static;
    width: 100%;
    margin-top: 10px;
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

//

#contentContainer_cms {
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
    #contentContainer_cms {
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
