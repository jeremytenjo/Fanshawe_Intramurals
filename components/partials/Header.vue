<template>
<div>
    <header id="header">
        <div id="logoCon">
            <img src="~assets/img/dash.png" alt="dash image">
            <p>ntramurals</p>
        </div>

        <h1><p id="teamName"></p></h1>

        <p id="pageTitle"></p>
        <img src="~assets/img/default_profile.png" alt="Profile Picture" id="profilePhoto" @click="showAccount">
        <my-inboxBox/>
        <p id="logoutBtn" @click="logout">Logout</p>
    </header>
    <div id="backDrop">
    </div>
    <img src="~assets/img/backArrow.svg" alt="Back icon" id="backIcon" @click="goBack">
    <img src="~assets/img/default_team_logo.png" alt="Team Logo" id="teamLogo">
    <my-mates />

</div>
</template>

<script>
export default {
    data() {
        return {
            clientORcms: this.$store.state.clientORcms
        }
    },
    mounted() {
        var profilePhoto = document.querySelector('#profilePhoto'),
            pageTitle = document.querySelector('#pageTitle'),
            teamLogo = document.querySelector('#teamLogo'),
            teamName = document.querySelector('#teamName'),
            messageContainer = document.querySelector('#messageContainer'),
            inboxlistContainer = document.querySelector('#inboxlistContainer'),
            inboxListCon_inner = document.querySelector('#inboxListCon_inner'),
            to_input = document.querySelector('#to_input'),
            messageContainer = document.querySelector('#messageContainer'),
            messageContainer_write = document.querySelector('#messageContainer_write'),
            urlTitle = window.location.pathname,
            self = this,
            mc_account = document.querySelector('#mc_account'),
            DarkOverlay = document.querySelector('#DarkOverlay');

        urlTitle = urlTitle.substring(1);
        urlTitle = urlTitle.charAt(0).toUpperCase() + urlTitle.slice(1);
        (function sddsdd() {
            pageTitle.innerHTML = urlTitle;
        })();

        //Set User Information
        // console.log(this.$store.state.userDataTeam);

        profilePhoto.src = '/userPhotos/' + this.$store.state.userData.photo;
        // teamLogo.src = '/teamLogos/' + this.$store.state.userDataTeam[0].file; from dbs
        teamLogo.src = '/teamLogos/' + this.$store.state.userDataTeam[0].file;
        teamName.innerHTML = this.$store.state.userDataTeam[0].name;
    },
    methods: {
        showAccount() {
            mc_account.style.display = 'block';
            DarkOverlay.style.display = 'block';
        },
        goBack() {
            console.log("HERE!!!!!");
            var messageInput = document.querySelector('#messageInput');
            var w = window.innerWidth;

            messageInput.value = '';
            newSubject.value = '';
            sendMessageCon.value = '';
            backIcon.style.display = 'none';
            messabeButtons.style.display = 'none';
            inboxlistContainer.style.display = 'block';
            // inboxListCon_inner.style.display = 'block';

            if (w <= 600) {
                messageContainer.style.display = 'none';

            }

        },
        logout() {
            location.reload(true);
            // this.$store.commit('set', false);
            // this.$store.commit('set_userDataTeam', '');
            // this.$store.commit('set_userDataTeamMates', '');
            // // console.log(this.$store.state);
            // this.$router.push('/login');
        }
    }
}
</script>

<style lang="scss" scoped>
#header {
    background-image: none;
    background-color: red;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 42px;
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 3;
}
#backDrop {
    background-color: red;
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    display: block;
    z-index: -1;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);

}
#backIcon {
    width: 30px;
    position: fixed;
    top: 43px;
    left: 18px;
    cursor: pointer;
    display: none;
}
#logoCon {
    display: none;
    p {
        color: white;
        font-size: 20px;
        position: relative;
        left: 30px;
        top: 30px;
    }
    img {
        width: 8px;
        position: absolute;
        left: 20px;
        top: 13px;
    }
}
#teamLogo {
    display: none;
}
#teamName {
    display: none;
}
#profilePhoto {
    display: none;
}

#pageTitle {
    color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18px;
}

#logoutBtn {
    color: white;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 30px;
    display: none;
}
@media (min-width: 600px) {
    #header {
        height: 250px;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
        display: block;
        background-image: url('~assets/img/sportBanners/soccerBanner.png');
        background-size: cover;
        background-color: rgba(215, 44, 44, 0.6);
        position: absolute;
    }
    #logoCon {
        display: block;

    }
    #backDrop {
        display: none;
    }
    #teamLogo {
        display: block;
        position: absolute;
        width: 200px;
        left: 30px;
        top: 140px;
        z-index: 3;
    }
    #backIcon {
        display: none;
    }
    #pageTitle {
        left: 54px !important;
        top: 20px;
        display: block;
        transform: none;
    }
    #teamName {
        display: block;
        position: absolute;
        color: white;
        font-size: 30px;
        font-weight: lighter;
        top: 200px;
        left: 235px;
        letter-spacing: 1px;
    }
    #profilePhoto {
        display: block;
        width: 40px;
        position: absolute;
        right: 105px;
        border-radius: 50%;
        top: 17px;
        cursor: pointer;
    }

    #logoutBtn {
        display: block;
    }
}
</style>
