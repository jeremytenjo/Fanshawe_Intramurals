<template lang="html">
<div id="cms_inboxContainer">

 <div id="cms_inboxList">

<div v-for="item in listData" :key="item.key" class="cms_inboxItem" @click="openItem(item._id)">
  <p class="fromP">{{item.from[0].fname}}  {{item.from[0].lname}}</p>
  <p class="subjectP">{{item.subject}}</p>
</div>

 </div>

 <div id="cms_inboxDetails">

   <div>
<img src="~assets/img/back.svg" alt="back button" id="backcms_inbox" @click="backInobx">
</div>

   <div id="detailsPadding">

      <p>From: <span class="bold">{{detailsData[0].from[0].fname}}  {{detailsData[0].from[0].lname}}</span></p>
      <p >Subject: <span class="bold" id="currentSubject">{{detailsData[0].subject}}</span></p>
      <p>Message:</p>
     <p class="bold">{{detailsData[0].message}}</p>
     <textarea name="name" rows="8" cols="80" placeholder="Write Response Here" id="replyMessage"></textarea>
   </div>

   <div @click="sendMessage(detailsData[0].from[0]._id)">
     <v-btn class="red" id="submitButton">Send</v-btn>
   </div>


 </div>

</div>
</template>

<script>
import axios from 'axios';

export default {
    middleware: 'auth',
    data() {
        return {
            listData: '',
            detailsData: '',
            subject: ''
        }
    },
    mounted: function mounted() {
        var self = this,
            addIcon = document.querySelector('#addIcon').style.display = 'none';

        // load list items
        axios.post('/api/inbox/getAllBy', {
            id: self.$store.state.userData._id
        }).then(function(response) {
            // console.log(response.data);
            self.listData = response.data;
        })

        //load first message
        axios.post('/api/inbox/getAllBy', {
            id: self.$store.state.userData._id
        }).then(function(response) {
            // console.log(response.data);
            self.detailsData = response.data;
        })


    },
    methods: {

        openItem(id) {
            var w = window.innerWidth,
                self = this,
                cms_inboxList = document.querySelector('#cms_inboxList'),
                cms_inboxDetails = document.querySelector('#cms_inboxDetails');

            //show details modal
            if (w <= 600) {
                cms_inboxList.style.display = 'none';
                cms_inboxDetails.style.display = 'grid';
            }
            axios.post('/api/inbox/getOne', {
                id: id
            }).then(function(response) {
                // console.log(response.data);
                self.detailsData = response.data;

            })
        },
        backInobx() {
            var w = window.innerWidth,
                cms_inboxList = document.querySelector('#cms_inboxList'),
                cms_inboxDetails = document.querySelector('#cms_inboxDetails');

            //hide details modal
            if (w <= 600) {
                cms_inboxList.style.display = 'block';
                cms_inboxDetails.style.display = 'none';
            }
        },
        sendMessage(id) {
            var replyMessage = document.querySelector('#replyMessage'),
                currentSubject = document.querySelector('#currentSubject'),
                snackBar_update = document.querySelector('#snackBar_update'),
                cms_inboxList = document.querySelector('#cms_inboxList'),
                cms_inboxDetails = document.querySelector('#cms_inboxDetails'),
                data = {},
                self = this,
                w = window.innerWidth,
                date = new Date(),
                monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            data.date = date;
            data.dateName = monthNames[date.getMonth()] + ' ' + date.getDate();
            data.to = id;
            data.subject = currentSubject.textContent;
            data.message = replyMessage.value
            data.from = self.$store.state.userData._id;

            // console.log(data);
            axios.post('/api/inbox/send', {
                data: data
            }).then(function(response) {})


            //hide details modal
            if (w <= 600) {
                cms_inboxList.style.display = 'block';
                cms_inboxDetails.style.display = 'none';
            }

            // snackBar
            snackBar_update.innerHTML = 'Message Sent';
            if (w <= 600) {
                TweenMax.to('#snackBar_update', .4, {
                    bottom: 0,
                    delay: .2
                });
                TweenMax.to('#snackBar_update', .3, {
                    bottom: '-60px',
                    delay: 2
                });
            } else {
                TweenMax.to('#snackBar_update', .4, {
                    bottom: 0,
                    delay: .2
                });
                TweenMax.to('#snackBar_update', .4, {
                    bottom: '-500px',
                    delay: 2
                });
            }

        }
    }
}
</script>

<style lang="scss">
.fromP {
    font-weight: bold;
    font-size: 18px;
    padding: 10px;
    margin: 0;
}
.subjectP {
    font-size: 18px;
    padding: 10px;
    margin: 0;
    padding-top: 0;
}
.cms_inboxItem {
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    width: 90%;
    margin: 10px auto 0;
    height: auto;
    cursor: pointer;

}
#cms_inboxContainer {
    // background-color: green;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    overflow: none;
    height: calc(100vh - 42px);
    width: 100%;

}
#cms_inboxList {
    // background-color: blue;
    height: calc(100vh - 42px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 30px;

}

#cms_inboxDetails {
    // background-color: yellow;
    height: calc(100vh - 42px);
    // overflow-y: scroll;
    overflow-x: hidden;
    display: none;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 50px 1fr 50px;
    padding: 10px;
}
#backcms_inbox {
    width: 30px;
    margin-top: 10px;
    margin-left: 20px;
}
#detailsPadding {
    padding: 0 20px 20px;
    overflow: scroll;
    overflow-x: hidden;
}
#replyMessage {
    // background: #9E9E9E;
    // color: white;
    height: 400px;
        border: solid 1px #9E9E9E;
}
.bold {
    font-weight: bold;
}
#submitButton {
    display: block;
    margin: 5px auto 0;
}
@media (min-width: 600px) {
    #cms_inboxContainer {
        grid-template-columns: 250px 2fr;
        height: calc(100vh - 155px);
    }
    #cms_inboxDetails {
        display: grid !important;
        height: calc(100vh - 155px);
    }
    #cms_inboxList {
        display: block !important;
        height: calc(100vh - 155px);
        border-right: solid 1px #EEEEEE;
        padding-top: 0;

    }
    #backcms_inbox {
        display: none;
        display: none;
    }
}
</style>
