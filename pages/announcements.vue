<template lang="html">
<div id="anouncmentContainer">
  <div id="announInput">
    <label for="title">Title</label>
    <input type="text" name="title" value="" id="titleInput">

    <!--Sport  -->
    <div>
      <label for="sport">Change Sport</label>
      <select name="sport" form="formContent" id="announInput2" v-model="selectInputs">
        <option disabled value="">Please select one</option>
      </select>
    </div>

    <!--  Message-->
    <label for="message">Message</label>
    <textarea name="name" rows="8" cols="80" id="anouncmentInput"></textarea>

    <!--  Input Button-->
    <div @click="send">
      <v-btn  class="red accent-4">Send</v-btn>

      <!--  Error Warning-->
      <p id="errorAnnoun">Please Fill all fields</p>

    </div>

  </div>


  <div id="announList">

<div id="a_head">
<div id="a_title">
<h6>Tite</h6>
</div>
<div id="a_message">
<h6>Message</h6>
</div>
<div id="a_date">
<h6>Date</h6>
</div>
</div>

<div class="a_item" v-for="item in list" :key="item.key">
<div class="a_title">
<p>{{item.title}}</p>
</div>
<div class="a_message">
<p>{{item.message}}</p>
</div>
<div class="a_date">
<p>{{item.dateName}}</p>
</div>
</div>

  </div>
</div>
</template>

<script>
import axios from '~plugins/axios'

export default {
    middleware: 'auth',
    data() {
        return {
            list: [],
            selectInputs: ''
        }
    },
    mounted: function mounted() {
        //do something after mounting vue instance
        var addIcon = document.querySelector('#addIcon');
        addIcon.style.display = 'none';

        this.initLoad();
    },
    methods: {
        initLoad() {
            var self = this,
                bundle,
                announInput2 = document.querySelector('#announInput2');

            //List of annoucements
            axios.post('/api/annoucements/getAll').then(function(response) {
                // console.log(response.data[0].sport[0]);
                self.list = response.data;
                self.selectInputs = response.data[0].sport[0];
            })

            //set sport
            axios.post('/api/tournaments/getAll').then(function(sport) {
                bundle += '<option disabled value="">Please select one</option>';
                for (var i = 0; i < sport.data.length; i++) {
                    // bundle += 'response.data[i]';
                    bundle += '<option value="' + sport.data[i]._id + '">' + sport.data[i].sport + '</option>';
                    announInput2.innerHTML = bundle;
                }
            })
        },
        send() {
            var self = this,
                titleInput = document.querySelector('#titleInput'),
                anouncmentInput = document.querySelector('#anouncmentInput'),
                snackBar_update = document.querySelector('#snackBar_update'),
                errorAnnoun = document.querySelector('#errorAnnoun'),
                w = window.innerWidth,
                data = {},
                date = new Date(),
                monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


            //Validation
            if (titleInput.value != '' || anouncmentInput.value != '') {

                //remove error
                errorAnnoun.style.display = 'none';

                //bundle data
                data.title = titleInput.value;
                data.message = anouncmentInput.value;
                data.date = date;
                data.seen = false;
                data.dateName = monthNames[date.getMonth()] + ' ' + date.getDate() + ' , ' + date.getFullYear();
                data.sport = self.selectInputs;

                // console.log(data);

                //Add to List
                self.list.unshift(data);

                //Insert to database
                axios.post('/api/annoucements/insert', {
                    data: data
                }).then(function(response) {})

                //Reset Form
                titleInput.value = '';
                anouncmentInput.value = '';

                // snackBar
                snackBar_update.innerHTML = 'Announcement Sent';
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
            } else {
                errorAnnoun.style.display = 'block';
            }

        }
    }

}
</script>

<style lang="scss">
#anouncmentContainer {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 430px 1fr;
    overflow: hidden;
}
#announInput {
    padding: 20px;

    input {
        height: 15px;
    }
}
#announList {
    overflow: scroll;
    height: calc(100vh - 472px);
    padding: 10px;
    border: 1px solid grey;
    overflow-x: hidden;
}
#a_head {
    display: grid;
    grid-template-columns: 100px 1fr 100px;
}
.a_item {
    display: grid;
    grid-template-columns: 100px 1fr 100px;
}
#errorAnnoun {
    color: red;
    position: relative;
    left: 120px;
    bottom: 30px;
    display: none;
}
#anouncmentInput {
    height: 200px;
    border-style: solid;
}
@media screen and (min-width: 600px) {
    #announList {
        height: calc(100vh - 585px);
    }
}
</style>
