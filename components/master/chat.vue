<template lang="html">
	<div id="chatContainer_master">
	    <div id="matesChatContainer">
        <div id="innerMatesDiv">
          <img :src="'userPhotos/' + result.photo" alt="Profile Picture" v-for="result in userDataTeamMates" @click="openMember(result._id)">
        </div>
	    </div>
			<div id="mateModal">
				<div>
					<img src="~assets/img/cancelBlack.svg" alt="Qualifieng Team logo" @click="closeModal">
				</div>
				<div>
					<img :src="'/userPhotos/' + mateInfo.photo" alt="Qualifieng Team logo" class="roundImg">
				</div>
				<div id="matedModalPadding">
					<p class="text-xs-center">{{mateInfo.fname}} {{mateInfo.lname}}</p>
					<h5 class="bold">Get in touch:</h5>
					<p>email: {{mateInfo.email}}</p>
					<p>number: {{mateInfo.number}}</p>
				</div>
			</div>

			<div id="chatContent">
				<div id="chatConversation" ref="messages">

					<div class="chatMessage"v-for=" message in messages">
						<div>
							<img :src="'/userPhotos/' + message.user[0].photo" alt="Qualifieng Team logo">
						</div>
						<div class="messageNme" v-if="message.user[0]._id != userID">
							<h6>{{message.user[0].fname}}  {{message.user[0].lname}}</h6>
							<div >
								<span class="pBackcolor"><p>{{message.message}}</p></span>
							</div>
						</div>

						<div class="messageNme" v-else>
							<h6>Me</h6>
							<div>
							<span class="pBackcolor">	<p class="sendRight">
									{{message.message}}
								</p>
								</span>
							</div>
						</div>

					</div>



				</div>
				<div id="chatInput">
<div>
		<textarea name="chatMessage" rows="15" cols="120" id="chatMessage_input" placeholder="Write a message..."></textarea>
</div>
<div>
	<img src="~assets/img/send-button.svg" alt="Qualifieng Team logo" @click="sendMessage" id="sendMessageBTN">

</div>
				</div>

			</div>
		</div>
</template>

<script>
import socket from '~plugins/socket.io.js';
import axios from '~plugins/axios';

export default {
    data() {
        return {
            userDataTeamMates: this.$store.state.userDataTeamMates,
            messages: '',
            userID: '',
            mateInfo: ''

        }
    },
    mounted: function mounted() {
        //do something after mounting vue instance
        // console.log('this.$store.state.userData.team[0]');
        var self = this,
            chatMessage_input = document.querySelector('#chatMessage_input'),
            chatConversation = document.querySelector('#chatConversation'),
            teamID = this.$store.state.userData.team[0];

        self.userID = this.$store.state.userData._id;
        // console.log(this.$store.state.userData._id);


        axios.post('/api/chat/getAll', {
            id: teamID
        }).then(function(response) {
            // console.log(response.data);
            self.messages = response.data;
        })

        //Get Message
        socket.on('frontReceive', function(message) {
            // console.log(chatConversation.scrollHeight);
            self.messages.push(message[0]);
            self.message = ''
            self.scrolldDown();
        });
    },
    watch: {
        'messages': 'scrolldDown'
    },
    methods: {
        sendMessage() {
            // console.log(chatMessage_input.value);

            if (chatMessage_input.value != '') {
                socket.emit('frontSend', chatMessage_input.value);
                chatMessage_input.value = '';
            }

        },
        scrolldDown() {
            this.$nextTick(() => {
                // this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
                chatConversation.scrollTop = chatConversation.scrollHeight;
            });
        },
        openMember(id) {
            // console.log(id);

            //Dropdown
            TweenMax.to("#mateModal", .3, {
                top: 100,
                ease: Power2.easeInOut
            });


            var self = this;
            axios.post('/api/users/getOne', {
                id: id
            }).then(function(response) {
                // console.log(response.data[0]);
                self.mateInfo = response.data[0];
            })
        },
        closeModal() {
            //Dropdown
            TweenMax.to("#mateModal", .2, {
                top: -260,
                ease: Power2.easeInOut
            });
        }
    }
}
</script>

<style lang="scss">
#innerMatesDiv {
    overflow: auto;
    overflow-y: hidden;
    width: auto;
    white-space: nowrap;
    background-color: red;
}
#matesChatContainer {
    display: inline;
    height: auto;
    // overflow: auto;
    // overflow-y: hidden;
    // background: black;
    position: fixed;
    width: 100%;
    top: 42px;
    left: 0;
    right: 0;
    height: 44px;
    z-index: 5;
    #innerMatesDiv {
        padding-top: 10px;
    }
    img {
        width: 40px;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        margin-right: 10px;
        cursor: pointer;
        :hover {
            display: none;
        }
    }
}

#chatContent {
    // border: 1px solid black;
    height: calc(100vh - 145px);
    margin-top: 70px;
    // position: relative;
    z-index: -1;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr 40px;
    #chatConversation {
        background: #ECEFF1;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-bottom: 20px;

        .chatMessage {
            display: grid;
            grid-template-columns: 75px 1fr;
            margin-top: 10px;

            position: relative;
            height: auto;

            img {
                border-radius: 50%;
                width: 50px;

            }
            h6 {
                margin-bottom: 5px;
                color: #9E9E9E;
            }
            p {
                background-color: red;
                border-radius: 6px;
                padding: 6px;
                max-width: 400px;
                color: white;
                margin-bottom: 0;

            }
        }
        .sendRight {
            float: right;
            margin-right: 20px;
            background-color: white !important;
            color: #212121 !important;
        }
        .pBackcolor {
            width: auto;
            display: inline-block;
        }
    }
    #sendMessageBTN {
        cursor: pointer;
    }
    #chatInput {
        // background: yellow;
        display: grid;
        grid-template-columns: 1fr 50px;
    }
    ::-webkit-input-placeholder {
        font-size: 13px!important;
    }
    input:-moz-placeholder {

        font-size: 13px!important;
        color: black;
    }

    img {
        width: 25px;
        display: block;
        margin: 10px auto 0;
    }
}
.bold {
    font-weight: bold;
}
.roundImg {
    border-radius: 50%;
    width: 100px !important;
    display: block;
    margin: 0 auto !important;
    // float: none !important;
    position: static !important;
    margin-top: 15px !important;
    margin-bottom: 15px !important;
    // border: solid 1px #555;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
#mateModal {
    background-color: white;
    height: 300px;
    width: 100%;
    position: fixed;
    z-index: 4;
    top: -260px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    img {
        width: 15px;
        position: absolute;
        right: 15px;
        top: 15px;
    }
}
#matedModalPadding {
    padding-left: 40px;
    padding-right: 40px;
}
@media (min-width: 600px) {
    #mateModal {
        display: none;
    }
    #matesChatContainer {
        display: none;
    }
    #chatContent {
        margin-top: 0;
        height: 100%;

    }
    #chatContainer_master {
        height: 100%;
    }
}
</style>
