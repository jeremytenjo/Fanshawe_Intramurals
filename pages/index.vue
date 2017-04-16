<template lang="html">
<div id="dashboardContainer">

<div id="DarkOverlay"></div>

<div id="dashboardContent">



	<div id="mc_fixtures">
		<master-fixtures />
	</div>

	<div id="mc_chat">
		<master-chat />
	</div>

	<div id="mc_standings">
		<master-standings />
	</div>
</div>

	<div id="mc_account">
		<img src="~assets/img/cancelIcon.svg" alt="Cancel Icon" id="cancelIcon2" @click="closeAccount">
		<master-account />
	</div>

	<div id="mc_inbox">
		<img src="~assets/img/cancelIcon.svg" alt="Cancel Icon" id="cancelIconInbox" @click="closeInbox">
  <img src="~assets/img/backArrow.svg" alt="Back icon" id="backIconInbox" @click="goBack">
		<master-inbox />
	</div>

</div>
</template>

<script>
require('../components/index.js');

import axios from '~plugins/axios'

export default {
    middleware: 'auth',
    mounted() {
        var mc_account = document.querySelector('#mc_account'),
            mc_inbox = document.querySelector('#mc_inbox'),
            inboxlistContainer = document.querySelector('#inboxlistContainer'),
            inboxListCon_inner = document.querySelector('#inboxListCon_inner'),
            messageContainer = document.querySelector('#messageContainer'),
            inboxContainer = document.querySelector('#inboxContainer'),
            backIconInbox = document.querySelector('#backIconInbox'),
            backIcon = document.querySelector('#backIcon'),
            messageContainer_write = document.querySelector('#messageContainer_write'),
            DarkOverlay = document.querySelector('#DarkOverlay');

    },
    methods: {
        closeAccount() {
            mc_account.style.display = 'none';
            DarkOverlay.style.display = 'none';
        },
        closeInbox() {
            mc_inbox.style.display = 'none';
            DarkOverlay.style.display = 'none';
        },
        goBack() {
            // console.log("HERE!");
            var messageInput = document.querySelector('#messageInput');
            messageInput.value = '';
            newSubject.value = '';
            sendMessageCon.value = '';
            messageContainer_write.style.display = 'none';
            messageContainer.style.display = 'block';
            inboxContainer.style.display = 'grid';
						inboxlistContainer.style.display = 'grid';
            // inboxListCon_inner.style.display = 'grid';
						backIcon.style.display = 'none';
						backIconInbox.style.display = 'none';

        }
    }
}
</script>
<style lang="scss">@media (min-width: 600px) {

    #DarkOverlay {
        background: black;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10;
        z-index: 3;
        bottom: 0;
        display: none;
        opacity: 0.5;
    }
    #dashboardContainer {}
    #dashboardContent {
        // border: 3px solid black;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: minmax(50px, auto);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        margin-left: 10px;
        margin-right: 10px;
        position: relative;

    }
    #mc_standings {
        height: 600px;
        overflow: scroll;
        // background: green;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        overflow-x: hidden;

    }
    #mc_fixtures {
        height: 600px;
        overflow: scroll;
        // background: blue;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        overflow-x: hidden;

    }
    #mc_chat {
        height: 600px;
        overflow: scroll;
        // background: yellow;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        overflow-x: hidden;

    }
    #mc_account {
        background: white;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        width: 370px;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
        display: none;

        #cancelIcon2 {
            position: absolute;
            width: 30px;
            top: -40px;
            left: 340px;
            cursor: pointer;
        }

    }
    #mc_inbox {
        background: orange;
        background: white;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        width: 70%;
        height: 550px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
        display: none;

        #cancelIconInbox {
            width: 30px;
            position: absolute;
            top: -40px;
            right: 0;
            cursor: pointer;

        }
        #backIconInbox {
            width: 30px;
            position: absolute;
            top: -40px;
            left: 0;
            cursor: pointer;
            display: none;
        }

    }

}
@media (min-width: 900px) {

    #dashboardContent {
        // border: 3px solid black;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(50px, auto);
        grid-column-gap: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }

}
</style>
