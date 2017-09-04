<template lang="html">
<div id="teamsContainer">

 <div id="teamsList">

<div class="teamsItem" @click="showDetails(item._id)" v-for="item in itemInfo" :key="item.key">
  <div>
    <img :src="'/teamLogos/' + item.file" alt="Team Logo">
  </div>
  <div>
<p>{{item.name}} ({{item.sport[0].sport}})</p>
</div>
</div>


 </div>
 <form id="teamsForm" action="index.html" enctype="multipart/form-data" method="post" v-on:submit.prevent="onSubmit">

 <div id="teamsDetails">
<div @click="hideDetails" class="teamsItem_back">
<img src="~assets/img/back.svg" alt="back arrow" >
</div>
<div class="teamsDetails_info">
<img src="teamLogos/default_team_logo.png" alt="team logo" id="profilePicture">


    <div>
      <input type="file" name="" value="" id="file">

    <input type="text" name="name" value="loading" id="name" class="accountInputs">
  </div>

  <!--Sport  -->
  <div id="sportContainer">
    <label for="sport">Change Sport</label>
    <select name="sport" form="formContent" id="teamInput" v-model="selectInputs">
    </select>
  </div>

  <!--  Players-->
  <p>Players:</p>
  <div id="playersList">

    <div class="playerItem" v-for="item in playerList" :key="item.key">
      <img :src="'userPhotos/' + item.photo" alt="team logo">
      <p>{{item.fname}} {{item.lname}}</p>
    </div>


  </div>

  <!-- Player Add -->
  <!-- <div>
    <label class="typo__label">Simple select / dropdown</label>
    <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="Pick some" label="name" track-by="name"></multiselect>
    <pre class="language-json"><code>{{ value  }}</code></pre>
  </div> -->

</div>

<div id="teamsubmit_con">
  <div>
    <v-btn outline class=" red red--text">Delete</v-btn>
  </div>
  <div>
    <v-btn  class="red accent-4" type="submit">Update</v-btn>
  </div>
</div>

 </div>
</form>

</div>
</template>

<script>
import axios from '~plugins/axios';

export default {
    middleware: 'auth',

    data() {
        return {
            itemInfo: '',
            selectInputs: '',
            selectInputsPlayer: '',
            playerList: ''
        }
    },
    mounted() {
        var deleteText = document.querySelectorAll('.deleteText'),
            teamsContainer = document.querySelector('#teamsContainer'),
            addIcon = document.querySelector('#addIcon'),
            teamInput = document.querySelector('#teamInput'),
            pageTitle = document.querySelector('#pageTitle'),
            playerInputs = document.querySelector('#playerInputs'),
            teamsList = document.querySelector('#teamsList'),
            self = this,
            bundle,
            bundle2,
            teamsDetails = document.querySelector('#teamsDetails');

//Set title

pageTitle.innerHTML = 'Teams';

        addIcon.style.display = 'block';
        axios.post('/api/teams/getAll').then(function(response) {
            self.itemInfo = response.data;
            // console.log(response.data[0]);
            var progilePhoto = document.querySelector('#progilePhoto'),
                // itemInfo = response.data,

                file = document.querySelector('#file'),
                profilePicture = document.querySelector('#profilePicture'),
                name = document.querySelector('#name').value = response.data[0].name;


            //set profile pictures
            profilePicture.src = '/teamLogos/' + response.data[0].file;

            // Set initial ID
            self.$store.commit('setContentID', response.data[0]._id);

            //set sport
            axios.post('/api/tournaments/getAll').then(function(sport) {

                bundle += '<option disabled value="">Please select one</option>';
                for (var i = 0; i < sport.data.length; i++) {
                    // bundle += 'response.data[i]';
                    bundle += '<option value="' + sport.data[i]._id + '">' + sport.data[i].sport + '</option>';
                    teamInput.innerHTML = bundle;
                }
            })

            //set players
            // console.log(response.data[0]._id);
            //player list
            axios.post('/api/users/teamMatesCMS', {
                id: response.data[0]._id
            }).then(function(mates) {
                self.playerList = mates.data;
            })

            // axios.post('/api/users/getAll').then(function(result) {
            //   // console.log(result);
            //   bundle2 += '<option disabled value="">Hold Control to select</option>';
            //     for (var a = 0; a < result.data.length; a++) {
            //         // bundle += 'response.data[i]';
            //         bundle2 += '<option value="' + result.data[a]._id + '">' + result.data[a].fname + ' '+result.data[a].lname + '</option>';
            //         playerInputs.innerHTML = bundle2;
            //     }
            // })

        })



    },
    methods: {
        deleteTeam(id) {
            // console.log(id);
            axios.post('/api/teams/delete', {
                id
            });
        },
        showDetails(id) {
            this.$store.commit('setContentID', id);
            // console.log(this.$store.state.contentId);
            var w = window.innerWidth,
                self = this,
                bundle = {};

            if (w <= 600) {
                teamsList.style.display = 'none';
                teamsDetails.style.display = 'grid';
                addIcon.style.display = 'none';
            }

            // //reset list
            // console.log("HERE!");
            // axios.post('/api/teams/getAll').then(function(response) {
            //     self.itemInfo = response.data;
            // })

            //et selected Item
            axios.post('/api/teams/getOne', {
                id: id
            }).then(function(response) {
                // console.log(response.data[0]);
                var progilePhoto = document.querySelector('#progilePhoto'),
                    file = document.querySelector('#file'),
                    profilePicture = document.querySelector('#profilePicture'),
                    name = document.querySelector('#name').value = response.data[0].name;

                //load profile pictures
                profilePicture.src = '/teamLogos/' + response.data[0].file;

                //load sport
                axios.post('/api/tournaments/getAll').then(function(sport) {
                    bundle += '<option disabled value="">Please select one</option>';
                    for (var i = 0; i < sport.data.length; i++) {
                        // bundle += 'response.data[i]';
                        bundle += '<option value="' + sport.data[i]._id + '">' + sport.data[i].sport + '</option>';
                        teamInput.innerHTML = bundle;
                    }
                })

                //load players
                axios.post('/api/users/teamMatesCMS', {
                    id: response.data[0]._id
                }).then(function(mates) {
                    self.playerList = mates.data;
                })

            })
        },
        hideDetails() {
            var w = window.innerWidth;
            if (w <= 600) {
                teamsList.style.display = 'block';
                teamsDetails.style.display = 'none';
                addIcon.style.display = 'block';
            }
        },
        onSubmit() {
            // console.log(id);
            var bundle = {},
                formData = new FormData(),
                accountInputs = document.querySelectorAll('.accountInputs'),
                w = window.innerWidth,
                currentPhoto,
                // self = this;
                file = document.querySelector('#file'),
                teamInput = document.querySelector('#teamInput'),
                snackBar_update = document.querySelector('#snackBar_update');

            formData.append('id', this.$store.state.contentId);

            // console.log(this.$store.state.teamsData[0].photo);

            //Get selected user current photo
            // console.log(self.$store.state.contentId);
            // console.log(file.value);
            axios.post('/api/teams/getOne', {
                id: self.$store.state.contentId
            }).then(function(response) {

                // console.log(response.data[0].file);
                currentPhoto = response.data[0].file;
                if (file.value === '') {
                    // console.log("HERE!");
                    // console.log(currentPhoto);
                    formData.append('file', currentPhoto);
                } else {
                    formData.append('file', file.files[0]);
                }

                // console.log(formData.get('file'));

                //Insert text inputs
                for (var i = 0; i < accountInputs.length; i++) {
                    formData.append(accountInputs[i].name, accountInputs[i].value);
                }
                var teamInput = document.querySelector('#teamInput');

                //sport selected
                var teamInput = teamInput.options[teamInput.selectedIndex].value;
                console.log(teamInput);
                if (teamInput === '') {
                    console.log('same');
                    formData.append('sport', response.data[0].sport[0]);
                } else {
                    console.log("Different");
                    formData.append('sport', teamInput);
                }


                // Show Data
                // for (var value of formData.values()) {
                //     console.log(value);
                // }

                //Update
                axios.post('/api/teams/update', formData).then(function(response) {

                })

                //Rest list
                self.$router.push('/reload');

                // snackBar
                snackBar_update.innerHTML = 'Update Successful';
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
            })
        }
    }
}
</script>

<style lang="scss">
.infoCon {
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    h2 {
        font-size: 16px;
        color: grey;
        text-align: center;

    }
    img {
        width: 80px;
        display: block;
        margin: 0 auto;
    }
    p {
        text-align: center;
        font-size: 20px;
        margin-top: 20px;
    }
}
.teamsItem {
    background: white;
    border-radius: 2px;
    width: 90%;
    height: 70px;
    margin: 20px auto 0;
    display: grid;
    grid-template-columns: 70px 1fr;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    img {
        width: 70px;
        padding: 10px;
        margin: 0 auto;
        display: block;
    }
    p {
        margin-top: 25px;
        text-align: center;
    }
}
.teamsItem_back {
    width: 40px;
    // background: green;
    margin-left: 20px;
    margin-top: 20px;
    img {
        width: 30px;
        cursor: pointer;
    }
}
html {
    overflow: hidden !important;
}
#teamsContainer {
    // background-color: green;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    overflow: none;
    height: calc(100vh - 42px);
    width: 100%;

}
#playerInputs {
    height: 400px;
}
#teamsList {
    // background-color: blue;
    height: calc(100vh - 42px);
    overflow-y: scroll;
    overflow-x: hidden;

}
#profilePicture {
    // border-radius: 50%;
}
#teamsDetails {
    // background-color: yellow;
    height: calc(100vh - 42px);
    // overflow-y: scroll;
    overflow-x: hidden;
    display: none;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 50px 1fr 50px;
}
#nameCon {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
}
.teamsDetails_info {
    overflow: scroll;
    overflow-x: hidden;
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
    img {
        width: 100px;
        margin: 0 auto;
        display: block;
    }
}
#teamsubmit_con {
    // background: green;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 300px;
    margin: 0 auto;

    button {
        margin: 0 auto;
        width: 50%;
        display: block;
        margin-top: 7px;
        max-width: 150px;

    }
}
#sportContainer {
    margin-bottom: 20px;
}
#playersList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 10px;
    img {
        width: 35px;
        margin-left: 0;
        float: left;
        border-radius: 50%;
    }
    p {
        padding-top: 8px;
        margin-left: 40px;
    }
}
@media (min-width: 600px) {
    #teamsContainer {
        grid-template-columns: 250px 2fr;
        height: calc(100vh - 155px);
    }
    #teamsDetails {
        display: grid !important;
        height: calc(100vh - 155px);
        grid-template-rows: 1fr 50px;

    }
    #teamsList {
        display: block !important;
        height: calc(100vh - 155px);
        border-right: solid 1px #EEEEEE;
    }
    .teamsItem {
        p {
            text-align: left;
        }
    }
    .teamsItem_back {
        display: none;
    }
}
</style>
