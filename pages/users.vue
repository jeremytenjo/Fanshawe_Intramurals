 <template lang="html">
<div id="usersContainer">

 <div id="usersList">

<div class="userItem" @click="showDetails(item._id)" v-for="item in itemInfo" :key="item.key">
  <div>
    <img :src="'/userPhotos/' + item.photo" alt="">
  </div>
  <div>
<p>{{item.fname}} {{item.lname}}</p>
</div>
</div>


 </div>
 <form id="userForm" action="index.html" enctype="multipart/form-data" method="post" v-on:submit.prevent="onSubmit">

 <div id="usersDetails">
<div @click="hideDetails" class="userItem_back">
<img src="~assets/img/back.svg" alt="back arrow" >
</div>
<div class="usersDetails_info">
<img src="userPhotos/default_user_logo.png" alt="back arrow" id="profilePicture">


<div id="nameCon">
    <div>
    <input type="text" name="fname" value="loading" id="fname" class="accountInputs">
  </div>
  <div>
    <input type="text" name="lname" value="loading" id="lname" class="accountInputs">
  </div>
  </div>
  <input type="text" name="number" value="loading" id="number" class="accountInputs">

  <input type="text" name="email" value="loading" id="email" class="accountInputs">
  <br>
  <label for="password">Change Password</label>
  <input type="text" name="password" placeholder="First name"value="" id="password" class="accountInputs">

 <input type="file" name="" value="" id="file">

 <div id="scheduleCon" >
   <h6>Schedule</h6>
   <p>
    <input type="checkbox" id="time1" value="time1">
    <label for="time1">10:00am - 11:00am</label>
  </p>
   <p>
    <input type="checkbox" id="time2" value="time2" >
    <label for="time2">11:00am - 12:00pm</label>
  </p>
   <p>
    <input type="checkbox" id="time3" value="time3" >
    <label for="time3">1:00pm - 2:00pm</label>
  </p>
   <p>
    <input type="checkbox" id="time4" value="time4" >
    <label for="time4">3:00pm - 4:00pm</label>
  </p>
   <p>
    <input type="checkbox" id="time5" value="time5" >
    <label for="time5">4:00pm - 5:00pm</label>
  </p>
 </div>

</div>

<div id="userSubmit_con">
  <div @click="deleteUser">
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
            itemInfo: ''
        }
    },
    mounted() {
        var deleteText = document.querySelectorAll('.deleteText'),
            usersContainer = document.querySelector('#usersContainer'),
            addIcon = document.querySelector('#addIcon'),
            usersList = document.querySelector('#usersList'),
            self = this,
            usersDetails = document.querySelector('#usersDetails'),
            addIcon = document.querySelector('#addIcon');

        //set url in store
        self.$store.commit('setUrlPage', 'Users');

        addIcon.style.display = 'block';

        axios.post('/api/users/getAll').then(function(response) {
            self.itemInfo = response.data;

            var progilePhoto = document.querySelector('#progilePhoto'),
                // itemInfo = response.data,
                time1 = document.querySelector('#time1'),
                time2 = document.querySelector('#time2'),
                time3 = document.querySelector('#time3'),
                time4 = document.querySelector('#time4'),
                time5 = document.querySelector('#time5'),
                file = document.querySelector('#file'),
                profilePicture = document.querySelector('#profilePicture'),
                fname = document.querySelector('#fname').value = response.data[0].fname,
                number = document.querySelector('#number').value = response.data[0].number,
                lname = document.querySelector('#lname').value = response.data[0].lname,
                email = document.querySelector('#email').value = response.data[0].email,
                password = document.querySelector('#password'),
                schedule = response.data[0].schedule;

            // console.log(response.data[0].photo);
            profilePicture.src = '/userPhotos/' + response.data[0].photo;

            // Set initial ID
            self.$store.commit('setContentID', response.data[0]._id);

            //Schedule
            for (var a = 0; a < schedule.length; a++) {
                // console.log(schedule[a]);
                if (schedule[a] === 'time1') {
                    time1.checked = true;
                } else if (schedule[a] === 'time2') {
                    time2.checked = true;
                } else if (schedule[a] === 'time3') {
                    time3.checked = true;
                } else if (schedule[a] === 'time4') {
                    time4.checked = true;
                } else if (schedule[a] === 'time5') {
                    time5.checked = true;
                }
            }

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
                self = this;

            if (w <= 600) {
                usersList.style.display = 'none';
                usersDetails.style.display = 'grid';
                addIcon.style.display = 'none';
            }

            //reset list
            axios.post('/api/users/getAll').then(function(response) {
                self.itemInfo = response.data;
            })

            axios.post('/api/users/getOne', {
                id: id
            }).then(function(response) {
                // console.log(response.data);
                var fname = document.querySelector('#fname').value = response.data[0].fname,
                    number = document.querySelector('#number').value = response.data[0].number,
                    lname = document.querySelector('#lname').value = response.data[0].lname,
                    email = document.querySelector('#email').value = response.data[0].email,
                    schedule = response.data[0].schedule,
                    time1 = document.querySelector('#time1'),
                    time2 = document.querySelector('#time2'),
                    time3 = document.querySelector('#time3'),
                    time4 = document.querySelector('#time4'),
                    time5 = document.querySelector('#time5');

                profilePicture.src = '/userPhotos/' + response.data[0].photo;

                //Schedule
                if (schedule.length === 0) {
                    time1.checked = false;
                    time2.checked = false;
                    time3.checked = false;
                    time4.checked = false;
                    time5.checked = false;
                } else {
                    for (var j = 0; j < schedule.length; j++) {
                        // console.log(schedule[j]);
                        if (schedule[j] === 'time1') {
                            time1.checked = true;
                        } else if (schedule[j] === 'time2') {
                            time2.checked = true;
                        } else if (schedule[j] === 'time3') {
                            time3.checked = true;
                        } else if (schedule[j] === 'time4') {
                            time4.checked = true;
                        } else if (schedule[j] === 'time5') {
                            time5.checked = true;
                        }
                    }
                }

            })


        },
        hideDetails() {
            var w = window.innerWidth;
            if (w <= 600) {
                usersList.style.display = 'block';
                usersDetails.style.display = 'none';
                addIcon.style.display = 'block';
            }
        },
        onSubmit() {
            // console.log(id);
            var bundle = {},
                formData = new FormData(),
                times = [this.$store.state.contentId],
                accountInputs = document.querySelectorAll('.accountInputs'),
                w = window.innerWidth,
                // self = this,
                currentPhoto,
                snackBar_update = document.querySelector('#snackBar_update'),
                file = document.querySelector('#file'),
                timesArray = [time1, time2, time3, time4, time5];

            formData.append('id', this.$store.state.contentId);

            //Schedule
            // console.log(timesArray);
            for (var a = 0; a < timesArray.length; a++) {
                // console.log(timesArray[a].checked);
                if (timesArray[a].checked === true) {
                    times.push(timesArray[a].value);
                }
            }
            // console.log(times);
            if (times.length != 0) {
                axios.post('/api/users/schedule', times).then(function(response) {
                    // console.log(response);
                    self.$store.commit('set', response.data);
                })
            }


            // console.log(this.$store.state.userData[0].photo);
            //Get selected user current photo
            // console.log(self.$store.state.contentId);
            axios.post('/api/users/getOne', {
                id: self.$store.state.contentId
            }).then(function(response) {
                // console.log(response.data[0].photo);
                currentPhoto = response.data[0].photo;

                if (file.value === '') {
                    formData.append('photo', currentPhoto);
                } else {
                    formData.append('photo', file.files[0]);
                }
                for (var i = 0; i < accountInputs.length; i++) {
                    formData.append(accountInputs[i].name, accountInputs[i].value);
                }

                // for (var value of formData.values()) {
                //     console.log(value);
                // }
                axios.post('/api/users/update', formData).then(function(response) {
                    // console.log(response.data[0].photo);
                    profilePicture.src = '/userPhotos/' + response.data[0].photo;

                })

                //reset
                axios.post('/api/users/getAll').then(function(response) {
                    self.itemInfo = response.data;
                })




                // snackBar
                snackBar_update.innerHTML = 'Update Succsesfull';
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
        },
        deleteUser() {
            var self = this,
                snackBar_update = document.querySelector('#snackBar_update'),
                w = window.innerWidth;


            // console.log(self.$store.state.contentId);
            axios.post('/api/users/delete', {
                id: self.$store.state.contentId
            }).then(function(response) {
                // console.log(response);
            })

            //Reset
            axios.post('/api/users/getAll').then(function(response) {
                self.itemInfo = response.data;

                var progilePhoto = document.querySelector('#progilePhoto'),
                    // itemInfo = response.data,
                    time1 = document.querySelector('#time1'),
                    time2 = document.querySelector('#time2'),
                    time3 = document.querySelector('#time3'),
                    time4 = document.querySelector('#time4'),
                    time5 = document.querySelector('#time5'),
                    file = document.querySelector('#file'),
                    profilePicture = document.querySelector('#profilePicture'),
                    fname = document.querySelector('#fname').value = response.data[0].fname,
                    number = document.querySelector('#number').value = response.data[0].number,
                    lname = document.querySelector('#lname').value = response.data[0].lname,
                    email = document.querySelector('#email').value = response.data[0].email,
                    password = document.querySelector('#password'),
                    schedule = response.data[0].schedule;

                // console.log(response.data[0].photo);
                profilePicture.src = '/userPhotos/' + response.data[0].photo;

                //Schedule
                for (var a = 0; a < schedule.length; a++) {
                    // console.log(schedule[a]);
                    if (schedule[a] === 'time1') {
                        time1.checked = true;
                    } else if (schedule[a] === 'time2') {
                        time2.checked = true;
                    } else if (schedule[a] === 'time3') {
                        time3.checked = true;
                    } else if (schedule[a] === 'time4') {
                        time4.checked = true;
                    } else if (schedule[a] === 'time5') {
                        time5.checked = true;
                    }
                }

            })


            //show list on mobile
            if (w <= 600) {
                usersList.style.display = 'block';
                usersDetails.style.display = 'none';
                addIcon.style.display = 'block';
            }


            // snackBar
            snackBar_update.innerHTML = 'Delete Succsesfull';
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

<style lang="scss" scoped>
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
.userItem {
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
        border-radius: 50%;
    }
    p {
        margin-top: 25px;
        text-align: center;
    }
}
.userItem_back {
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
#usersContainer {
    // background-color: green;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    overflow: none;
    height: calc(100vh - 42px);
    width: 100%;

}
#usersList {
    // background-color: blue;
    height: calc(100vh - 42px);
    overflow-y: scroll;
    overflow-x: hidden;

}
#profilePicture {
    border-radius: 50%;
}
#usersDetails {
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
.usersDetails_info {
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
#userSubmit_con {
    // background: green;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    button {
        margin: 0 auto;
        width: 50%;
        display: block;
        margin-top: 7px;
    }
}
@media (min-width: 600px) {
    #usersContainer {
        grid-template-columns: 250px 2fr;
        height: calc(100vh - 155px);
    }
    #usersDetails {
        display: grid !important;
        height: calc(100vh - 155px);
        grid-template-rows: 1fr 50px;

    }
    #usersList {
        display: block !important;
        height: calc(100vh - 155px);
        border-right: solid 1px #EEEEEE;
    }
    .userItem {
        p {
            text-align: left;
        }
    }
    .userItem_back {
        display: none;
    }
}
</style>
