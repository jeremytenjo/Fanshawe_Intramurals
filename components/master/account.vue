<template lang="html">
  <div id="accountContainer">
<my-snackBar-update/>
		<div id="backgroundAccenutn">
      <img src="~assets/img/studentPhotos/1.png" alt="Profile Picture" id="progilePhoto">
		</div>


  <form id="accountForm" action="index.html" enctype="multipart/form-data" method="post" v-on:submit.prevent="onSubmit">
    <div id="nameCon">
      <div>
      <input type="text" name="fname" value="Jeremy" id="fname" class="accountInputs">
    </div>
    <div>
      <input type="text" name="lname" value="Tenjo" id="lname" class="accountInputs">
    </div>
    </div>
    <input type="text" name="number" value="Tenjo" id="number" class="accountInputs">
    <input v-validate="'required|email'" type="text" name="email" value="Jeremy@gmail.com" id="email" class="accountInputs">
    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
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


  <div class="infoCon">
  	<div>
  		<h2>Current Team</h2>
  	</div>
  	<div>
  		<h2>Sport</h2>
  	</div>
  	<div>
  		<img src="~assets/img/teamLogos/United.png" alt="Team Logo" id="currentTeam">
  	</div>
  	<div>
  		<p>Soccer</p>
  	</div>
  </div>
  <div id="accountButtons">
<div @click="toWelcome">
<v-btn outline class="teal--text">Change Sport</v-btn>
</div>
<div id="a_updateButton">
<v-btn outline class="red--text"  type="submit">Update</v-btn>
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
            userData: ''
        }
    },
    mounted() {

        var progilePhoto = document.querySelector('#progilePhoto'),
            self = this,
            time1 = document.querySelector('#time1'),
            time2 = document.querySelector('#time2'),
            time3 = document.querySelector('#time3'),
            time4 = document.querySelector('#time4'),
            time5 = document.querySelector('#time5'),
            file = document.querySelector('#file'),
            fname = document.querySelector('#fname').value = this.$store.state.userData.fname,
            number = document.querySelector('#number').value = this.$store.state.userData.number,
            lname = document.querySelector('#lname').value = this.$store.state.userData.lname,
            email = document.querySelector('#email').value = this.$store.state.userData.email,
            password = document.querySelector('#password'),
            currentTeam = document.querySelector('#currentTeam'),
            matesContainer = document.querySelector('#matesContainer'),
            profilePhoto = document.querySelector('#profilePhoto'),
            schedule = this.$store.state.userData.schedule,
            progilePhoto = document.querySelector('#progilePhoto');

        // console.log(this.$store.state.userData.schedule);
        progilePhoto.src = '/userPhotos/' + this.$store.state.userData.photo;
        currentTeam.src = '/teamLogos/' + this.$store.state.userDataTeam[0].file;
        this.userData = this.$store.state.userData.photo;

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


    },
    methods: {
        onSubmit() {
            var bundle = {},
                formData = new FormData(),
                times = [this.$store.state.userData._id],
                accountInputs = document.querySelectorAll('.accountInputs'),
                w = window.innerWidth,
                self = this,
                snackBar_update = document.querySelector('#snackBar_update'),
                timesArray = [time1, time2, time3, time4, time5];

            formData.append('id', this.$store.state.userData._id);

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


            //password
            // console.log(password.value);

            if (file.value === '') {
                formData.append('photo', this.$store.state.userData.photo);
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
                // console.log(response.data[0]);
                self.$store.state.userData = response.data[0];
                // console.log(self.$store.state.userData.photo);
                progilePhoto.src = '/userPhotos/' + self.$store.state.userData.photo;
                profilePhoto.src = '/userPhotos/' + self.$store.state.userData.photo;
                currentTeam.src = '/teamLogos/' + self.$store.state.userDataTeam[0].file;
                self.userData = self.$store.state.userData.photo;
                // matesContainer.children[0].src = '/userPhotos/' + self.$store.state.userData.photo;
                // console.log(matesContainer.children[0]);
            })


            // console.log(self);

 







            //snackBar
            if (w <= 600) {
                TweenMax.to(snackBar_update, .4, {
                    bottom: 42,
                    delay: .2
                });
                TweenMax.to(snackBar_update, .3, {
                    bottom: '-60px',
                    delay: 2
                });
            } else {
                TweenMax.to(snackBar_update, .4, {
                    bottom: 0,
                    delay: .2
                });
                TweenMax.to(snackBar_update, .4, {
                    bottom: '-500px',
                    delay: 2
                });
            }

        },
        toWelcome() {
            this.$router.push('welcome');
        }
    }
}
</script>

<style lang="scss">
.is-danger {
    color: red;
    font-size: 12px;
}
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
#scheduleCon {
    h6 {
        margin-top: 30px;
    }
}
#accountForm {
    margin: 0 auto;
    width: 90%;
    margin-top: 60px;

}
#accountContainer {
    margin-top: 80px;
    padding-bottom: 60px;
    // display: grid;
    // grid-template-columns: repeat(1, 1fr);
    // grid-template-rows: 200px 2fr
    // h2 {
    //   margin-top: 80px;
    //   margin-left: 10px;
    //   font-size: 16px;
    //   color: grey;
    // }
    button {
        margin: 0 auto;
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 150px;
    }
}
#backgroundAccenutn {
    height: 50px;
    width: 100%;
    background: red;
    margin-top: -50px;
    // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

}
#progilePhoto {
    width: 100px;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
}
#accountButtons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: fixed;
    bottom: 40px;
    width: 100%;
    left: 0;
    background: white;
}
#accountForm {}
#nameCon {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
}
@media (min-width: 600px) {
    #accountContainer {
        margin-top: 0;
    }
    #accountButtons {
        bottom: 0;
    }
    #backgroundAccenutn {

        background: none;

    }
}
</style>
