<template lang="html">
  <div id="inboxContainer">
    <snackBar/>

<div id="inboxlistContainer">

<!-- <div id="inboxListCon_inner"> -->
<div id="listMessagess">
   <div v-for="result in inboxMessages">
    <div id="messageList_items">
  <ul two-line>
    <li-item @click="loadMessage(result._id, result.from[0]._id, result.subject)" >
      <li-tile avatar ripple>
        <li-tile-content>
          <li-tile-title>{{result.from[0].fname}} {{result.from[0].lname}}</li-tile-title>
          <li-tile-sub-title class="grey--text text--darken-4">{{result.subject}}</li-tile-sub-title>
          <!-- <li-tile-sub-title>{{result.message}}</li-tile-sub-title> -->
          <li-tile-sub-title><p id="pShort">{{result.message}}</p></li-tile-sub-title>
        </li-tile-content>
        <li-tile-action>
          <li-tile-action-text>{{result.dateName}}</li-tile-action-text>
        </li-tile-action>
      </li-tile>
    </li-item>

  </ul>
</div>
</div>
</div>


<img src="~assets/img/submitbutton.png" alt="write Team logo" id="writeIcon" @click="writeMessage">

<!-- Dasboard Write Button -->
<div @click="writeMessage">
  <v-btn warning dark id="dashWriteButton" >New</v-btn >
</div>

<!-- </div> -->
</div>



<div id="messageContainer">
  <div id="messageInnerCon">
<h4 id="fromhfourone" class="hfourf"><span></span></h4>
<h4 id="fromsubject" class="hfourf"></h4>
<p id="fromMessage"></p>
<div id="messageInput_con">
  <div>
    <textarea id="messageInput" name="sendMessage" rows="20" cols="80" placeholder="Reply.."></textarea>
  </div>
  <div >
    <img src="~assets/img/send-button.svg" alt="Qualifieng Team logo" id="replyIcon" @click="sendMessage">
  </div>
</div>


  </div>
  <div id="dash_inputBtns">
<div @click="cancelMessage">
  <v-btn outline class="red--text">Cancel</v-btn>
</div>
<div @click="sendMessage">
  <v-btn class="red white--text">Send</v-btn >
</div>
  </div>
</div>


  <div id="messageContainer_write">
<div id="messageHeader">

  <!-- <label for="to">To:</label>
  <input type="text" name="to" value="" id="newTo"> -->

  <label for="subject">Subject:</label>
  <input type="text" name="subject" value="" id="newSubject">
  <label>Message:</label>

</div>
<div id="messageWrapper">
  <textarea name="message" rows="100" cols="80" id="sendMessageCon"></textarea>
</div>
<div id="messabeButtons"@click="sendMessage_new">
  <v-btn class="red white--text"  id="newBtn">Send</v-btn >
</div>


  </div>
  </div>
</template>

<script>
import axios from 'axios';
import snackbar from '~/components/partials/snackbars/send.vue';

export default {
  components: {
    snackbar
  },
  data() {
    return {
      inboxMessages: '',
      openedMessage: '',
      openedMessageID: ''
    }
  },
  mounted() {
    //do something after mounting vue instance
    var self = this,
      // sendCon = document.querySelector('#sendCon'),
      // to_input = document.querySelector('#to_input'),
      messageContainer = document.querySelector('#messageContainer'),
      messageContainer_write = document.querySelector('#messageContainer_write'),
      fromhfourone = document.querySelector('#fromhfourone'),
      fromsubject = document.querySelector('#fromsubject'),
      inboxlistContainer = document.querySelector('#inboxlistContainer'),
      fromMessage = document.querySelector('#fromMessage'),
      backIcon = document.querySelector('#backIcon');

    // if (this.$store.state.userData.type === 'admin') {
    //     to_input.style.display = 'block';
    // }

    axios.post('/api/inbox/getAllBy', {
      id: this.$store.state.userData._id
    }).then(function(response) {
      self.inboxMessages = response.data;
      // console.log(self.inboxMessages);
    })
  },
  methods: {
    loadMessage(id, fromID, subject) {
      // console.log(id);
      // console.log("HERE!");
      // console.log(subject);
      var messageInput = document.querySelector('#messageInput');
      messageInput.value = '';

      this.$store.commit('setfromID', fromID);
      this.$store.commit('setinboxSubject', subject);

      var w = window.innerWidth;
      this.openedMessageID = id;
      // console.log(w);
      messageContainer.style.display = 'grid';
      backIcon.style.display = 'block';
      if (w <= 600) {
        inboxlistContainer.style.display = 'none';
      }

      //Get Inbox Message
      axios.post('/api/inbox/getOne', {
        id: id
      }).then(function(response) {
        // console.log(response.data[0]);
        fromhfourone.innerHTML = 'From: ' + response.data[0].from[0].fname + ' ' + response.data[0].from[0].lname;
        fromsubject.innerHTML = 'Subject: ' + response.data[0].subject;
        fromMessage.innerHTML = response.data[0].message;

      })
    },
    sendMessage() {
      // console.log(this.$store.state.fromID);
      var messageInput = document.querySelector('#messageInput'),
        bundle = {};
      // console.log(messageInput.value);
      bundle.from = this.$store.state.userData._id;
      bundle.to = '58c3657183e0930e34bf79d8';
      bundle.message = messageInput.value;
      bundle.subject = this.$store.state.inboxSubject;
      if (messageInput.value != '') {
        // console.log(bundle);
        axios.post('/api/inbox/send', {
          data: bundle
        }).then(function(response) {
          console.log(response);
        })
      }
    },
    sendMessage_new() {
      var newTo = document.querySelector('#newTo'),
        newSubject = document.querySelector('#newSubject'),
        snackBar_update = document.querySelector('#snackBar_update'),
        sendMessageCon = document.querySelector('#sendMessageCon'),
        bundle = {},
        w = window.innerWidth;

      if (newSubject.value != '' && sendMessageCon.value != '') {

        bundle.from = this.$store.state.userData._id;
        bundle.message = sendMessageCon.value;
        bundle.to = '58c3657183e0930e34bf79d8';
        bundle.subject = newSubject.value;
        if (sendMessageCon.value != '') {
          // console.log(bundle);
          axios.post('/api/inbox/send', {
            data: bundle
          }).then(function(response) {
            // console.log('response');
            messageContainer_write.style.display = 'none';
            inboxlistContainer.style.display = 'block';
            inboxContainer.style.display = 'grid';
            newSubject.value = '';
            sendMessageCon.value = '';
          })
        }
      }

      //snackBar
      snackBar_update.innerHTML = 'Message Sent';
      if (w <= 600) {
        TweenMax.to('#snackBar_update', .4, {
          bottom: 42,
          delay: .2
        });
        TweenMax.to('#snackBar_update', .3, {
          bottom: '-600px',
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
    },
    writeMessage() {

      var w = window.innerWidth,
        backIconInbox = document.querySelector('#backIconInbox'),
        inboxListCon_inner = document.querySelector('#inboxListCon_inner'),
        messabeButtons = document.querySelector('#messabeButtons'),
        inboxContainer = document.querySelector('#inboxContainer');


      backIcon.style.display = 'block';
      messabeButtons.style.display = 'block';
      inboxlistContainer.style.display = 'none';
      // inboxListCon_inner.style.display = 'none';

      if (w <= 600) {
        // sendCon.style.display = 'block';
      } else {
        inboxContainer.style.display = 'block';
        messageContainer_write.style.display = 'grid';
        messageContainer.style.display = 'none';
        backIconInbox.style.display = 'block';
      }

    },
    cancelMessage() {
      var messageInput = document.querySelector('#messageInput');
      messageInput.value = '';
    },
    cancelMessage_new() {
      // console.log("HERE!");
      messageContainer_write.style.display = 'grid';
      messageContainer.style.display = 'block';
      inboxlistContainer.style.display = 'block';
      inboxContainer.style.display = 'grid';

    }
  }
}
</script>

<style lang="scss">
.hfourf {
    font-size: 20px;
    line-height: 20px;
}
#pShort {
    width: 140px;
}
#inboxContainer {
    margin-top: 70px;
    overflow: hidden;
    border-radius: 2px;
    // height: calc(100vh - 145px);

}
#inboxlistContainer {
    background: white;
    height: 100%;
    position: absolute;
    width: 100%;

}
#inboxListCon_inner {
    width: 90%;
    margin: 10px auto 0;
    padding-bottom: 130px;

}
#writeIcon {
    width: 60px;
    position: fixed;
    bottom: 60px;
    right: 10px;
    cursor: pointer;
    display: block;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

}
#dashWriteButton {
    display: none;
}
#messageContainer {
    background: white;
    overflow: scroll;
    display: none;
    position: fixed;
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding-bottom: 150px;
    // left: 80px;
    #messageInnerCon {
        width: 90%;
        margin: 0 auto;
    }
}
#messageInput_con {
    display: grid;
    grid-template-columns: 10fr 1fr;
    grid-column-gap: 10px;
    position: fixed;
    bottom: 42px;
    background: white;
    left: 0;
    padding-left: 20px;
    padding-right: 20px;
    border-top: 1px solid lightgrey;
}
textarea::-webkit-input-placeholder {
    color: black;
    font-size: 20px;
}
textarea::-moz-input-placeholder {
    color: black;
    font-size: 20px;
}

#messageInput {}
#replyIcon {
    width: 30px;
    margin: 0 auto;
    display: block;
    margin-top: 8px;
}
#dash_inputBtns {
    display: none;
}
#to_input {
    margin-top: 10px;
    display: none;
}
#messageContainer_write {
    // background-color: green;
    height: calc(100vh - 145px);
    display: grid;
    padding-bottom: 0;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 50px;
    input[type=text] {
        height: auto;
    }
    padding: 60px 30px 0;
    #messageHeader {
        // background-color: green;
    }
    #messageWrapper {
        // background-color: blue;
        overflow: scroll;
        padding-top: 20px;
        overflow-x: hidden;
    }
    #messabeButtons {
        // background-color: yellow;
        display: none;
    }
};
#messageInnerCon_write {
    @extend #messageInnerCon;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 1fr 200px;
    grid-row-gap: 5px;
    display: none;
    input {
        height: 15px;
    }
}
#newBtn {
    display: block;
    margin: 0 auto;
    width: 40%;
}
#sendCon {
    position: fixed;
    width: 100%;
    bottom: 70px;
    left: 0;
    display: none;
}
#sendMessageCon {
    height: 600px;
    // padding-bottom: 40px;
}
#fromhfourone_write {
    // @extend #fromhfourone;
};
#fromsubject_write {
    // @extend #fromsubject;
};
#fromMessage_write {
    @extend #fromMessage;
};
#messageInput_con_write {
    @extend #messageInput_con;
};
#messageInput_write {
    @extend #messageInput;
};
#dash_inputBtns_write {
    @extend #dash_inputBtns;

};
@media (min-width: 600px) {
    #sendMessageCon {
        height: 300px;
        padding-bottom: 40px;
    }
    #dash_inputBtns_write {
        position: fixed;
    };
    #messageContainer_write {
        height: auto;
    };
    #inboxContainer {
        margin-top: 0;
        display: grid;
        grid-template-columns: 1fr 3fr;
        height: auto;
        border-radius: 2px;
    }
    #inboxlistContainer {
        position: initial;
        height: auto;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 1fr 50px;
    }
    #inboxListCon_inner {
        height: 560px;
        overflow: scroll;
        padding-bottom: 70px;
    }
    #messageContainer {
        position: relative;
        padding-bottom: 0;
        height: 560px;
        display: block;
    }
    #messageInput_con {

        display: block;
        height: 150px;
        position: absolute;
        bottom: 70px;
        left: 0;
        right: 0;
        width: 90%;
        margin: auto;
        padding-left: 0;
        padding-right: 0;

    }
    #fromMessage {
        height: 210px;
        overflow: scroll;
        overflow-x: hidden;
    }
    #replyIcon {
        display: none;
    }
    #messageInput {
        height: 150px;
        width: 100%;

    }
    #dash_inputBtns {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: auto;
        width: 90%;
        max-width: 400px;
        background: white;
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: auto;
        button {
            display: block;
            margin: 0 auto;
            width: 150px;
        }

    }
    #listMessagess {
        // background-color: green;
        height: 500px;
        overflow: scroll;
        width: 90%;
        margin: 0 auto;

    }
    #dashWriteButton {
        width: 100px;
        margin: 0 auto;
        display: block;
        // position: fixed;
        // bottom: 10px;
        // left: 40px;
        // right: 0;
        // cursor: pointer;
        // margin: 0;
        // padding: 0;
        // display: block;
        background-color: yellow;
    }
    #writeIcon {
        display: none;
    }
    #messageList_items {
        width: 90%;
    }
}
</style>
