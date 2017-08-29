<template lang="html">
	<div>

<img large v-badge:6.left src="~assets/img/inbox_white.svg" alt="inbox icnon" id="inboxIcon" @click="showInbox">
<div id="inboxBox">

	<img src="~assets/img/triangle.svg" alt="search icon" class="navTriangleInbox" />
<p id="inboxTitle" >Inbox</p>
<p id="noEmail">No New Email</p>
	<v-list two-line>
		<div @click="showMessage(message._id)" v-for="message in messages">
    <v-list-item >
      <v-list-tile ripple >
        <v-list-tile-content>
          <v-list-tile-title>{{message.from_name}}</v-list-tile-title>
          <v-list-tile-sub-title class="grey--text text--darken-4">{{message.subject}}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{message.message}} </v-list-tile-sub-title>
        </v-list-tile-content>
			</v-list-tile>
      <v-divider ></v-divider>
    </v-list-item>
</div>
  </v-list>

</div>
</div>
</template>

<script>
import axios from 'axios';

export default {

    mounted() {
        var inboxBox = document.querySelector('#inboxBox'),
            noEmail = document.querySelector('#noEmail'),
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
					var inboxBox = document.querySelector('#inboxBox'),
	            noEmail = document.querySelector('#noEmail'),
	            addIcon = document.querySelector('#addIcon');
	            self = this;
            var userData_id = self.$store.state.userData;
            // console.log(userData_id);
            axios.post('/api/inbox/getAllBy', {
                id: userData_id
            }).then(function(response) {
                // console.log(response);
                if (response.data.length === 0) {
                    noEmail.style.display = 'block';
                }else {
									self.messages = response.data;
                }

            })

            if (inboxBox.style.display != 'block') {
                inboxBox.style.display = 'block';
                addIcon.style.opacity = 0;
            } else {
                inboxBox.style.display = 'none';
                addIcon.style.opacity = 1;
            }
        },
        showMessage(id) {
            console.log(id);
            inboxBox.style.display = 'none';
            addIcon.style.opacity = 1;
            self.$router.push('/inbox_cms');
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
        right: 23px;
        top: 21px;
        cursor: pointer;
    }
}
#inboxBox {
    background-color: white;
    width: 330px;
    height: auto;
    position: fixed;
    top: 80px;
    right: 23px;
    border-radius: 2px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
    display: none;
    z-index: 3;

}
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
