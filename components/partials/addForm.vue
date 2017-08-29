<template lang="html">
	<div id="addFormContainer">

	<div  @click="showForm()">
	<v-btn floating="floating" id="addIcon">
		<img src="~assets/img/add.svg" alt="menu icon"  />
	</v-btn>
</div>

<div id="formCon">
	<div id="form">
		<div id="formTitle"></div>
			<form  id="formContent"  enctype="multipart/form-data"   action="/api/teams/test"   method="post" v-on:submit.prevent="onSubmit">

				<!--  Teams-->
				<div id="teamInputs" v-if="teamsData != 'false'">
					<div>
						<label for="file">Team logo</label>
			      <input type="file" name="file" value="" id="file">

						<label for="name">Team Name</label>
			    <input type="text" name="name" value="" id="name3">
			  </div>

			  <!--Sport  -->
			  <div id="sportContainer">
			    <label for="sport">Change Sport</label>
			    <!-- <select name="sport" form="formContent" id="teamInput2" v-model="selectInputs" > -->
			    <select name="sport" form="formContent" id="teamInput2" >
			    </select>
			  </div>

				</div>


				<!--  Tournamnets-->
				<div id="teamInputs" v-if="tournamentsData != 'false'">
					<label for="sport">Sport</label>
					<input type="text" name="sport" v-model="updateSport">

					<label for="Type">Type</label>
					<input type="text" name="Type" v-model="updateType">

					<label for="Capacity">Capacity</label>
					<input type="text" name="Capacity" v-model="updateCapacity">

					<label for="rules">Rules</label>
					<textarea rows="30" name="rules" v-model="updateRules"></textarea>

					<label for="icon">Icon</label>
					<br>
					<input type="file" name="icon" id="iconInput">
					<br>
					<br>
					<label for="banner">Banner</label>
					<br>
					<input type="file" name="banner" id="bannerInput">
					<br>
					<br>
					<label for="promoBanner">Promo Banner</label>
					<br>
					<input type="file" name="promoBanner" id="promoBannerInput">
					<br>
					<br>
					<label for="rbgaInput">Gradient Color (RGBA)</label>
					<input type="text" name="rbgaInput" v-model="updateRgba">

					<label for="startDate">Start Date</label>
					<input type="date" name="startDate" v-model="updatestartDate">

					<label for="endDate">End Date</label>
					<input type="date" name="endDate" v-model="updateEndDate" placeholder="DDMMYYYY">
				</div>



				<!--  Users-->
				<div id="teamInputs" v-if="usersData != 'false'">
					<p id="usersAlert">*Please fill all the fields</p>
						<label for="fname">First Name</label>
						<input type="text" name="fname" class="inputs required">
						<label for="lname">Last Name</label>
						<input type="text" name="lname" class="inputs required">
						<label for="email">Email</label>
						<input type="text" name="email" class="inputs required">
						<label for="password">Password</label>
						<input type="text" name="password" class="inputs required" value="pass">
						<label for="number">Number</label>
						<input type="text" name="number" class="inputs" value="0">
						<label for="type" class="hidden">Type</label>
						<input type="text" name="type" value="student" class="inputs hidden">
						<label for="file">Photo</label>
						<input type="file" name="file" id="file">

						<label for="team">Select Team</label>
						<select name="team" form="formContent" id="teamInputUsers"></select>


				</div>





				<div id="teamInputs" v-if="inboxData != 'false'">
					<p>Hi Inbox</p>
				</div>
				<div id="teamInputs" v-if="announcementsData != 'false'">
					<p>Hi Annuicemnt</p>
				</div>






		<div id="formBtns">
			<div id="innerDivForm">
				<div @click="cancelForm" id="move">
					<v-btn small primary dark outline class="formCancelBtn red red--text" ><p>Cancel</p></v-btn>
				</div>
				<div>
				<v-btn small primary dark class="formSubmitBtn red" type="submit" ><p>Submit</p></v-btn>
			</div>

			</div>

		</div>
		</form>

	</div>

</div>



</div>
</template>

<script>
import axios from 'axios';
// var addForm = require('./services/addForm.js');

export default {

    data() {
        return {
            teamSelected: 'None',
            teamsData: 'false',
            tournamentsData: 'false',
            usersData: 'false',
            inboxData: 'false',
            announcementsData: 'false',
            selectInputs: '',
            sportsList: '',
            updateSport: '',
            updateType: '',
            updateRules: '',
            updateCapacity: '',
            updateRgba: '',
            updatestartDate: '',
            updateEndDate: '',
            updatestartDateName: '',
            updateEndDateName: ''

        }
    },
    methods: {
        mounted() {
            var formCon = document.querySelector('#formCon'),
                form = document.querySelector('#form'),
                formTitle = document.querySelector('#formTitle'),
                teamInputForm = document.querySelector('#teamInputForm'),
                // sportInputs = document.querySelector('#sportInputs'),
                formContent = document.querySelector('#formContent'),
                formBtns = document.querySelector('#formBtns'),
								teamInputUsers = document.querySelector('#teamInputUserss'),
                addIcon = document.querySelector('#addIcon'),
                self = this;


        },
        showForm() {
            self = this;
            addIcon.style.display = 'none';
            formCon.style.display = 'block';
            var bundle,
                bundle3,
                teamInputForm = document.querySelector('#teamInputForm'),
                teamInputUsers = document.querySelector('#teamInputUsers'),
                teamInput = document.querySelector('#teamInput2');
            // sportInputs = document.querySelector('#sportInputs');

						console.log(self.$store.state.urlPage);

            //Determine Title
            var urlTitle = window.location.pathname;
            var original = urlTitle.substring(1);
            // // console.log(original);
            // urlTitle = original.slice(0, -1);
            var urlTitle = '<p>add ' + self.$store.state.urlPage + '</p>';
            // console.log(urlTitle);
            formTitle.innerHTML = urlTitle;

            // console.log(self.$store.state.urlPage);

// console.log(teamInputUsers);

            if (self.$store.state.urlPage === 'Teams') {
                // addForm.teams(function(data) {
                //Display
                self.teamsData = 'true';
                self.tournamentsData = 'false';
                self.usersData = 'false';
                self.inboxData = 'false';
                self.announcementsData = 'false';
                //
                //load sport
								// console.log(teamInputUsers);
                axios.post('/api/tournaments/getAll').then(function(sport) {
                    // console.log(sport);
                    bundle += '<option disabled value="">Please select one</option>';
                    for (var i = 0; i < sport.data.length; i++) {
                        // bundle += 'response.data[i]';
                        bundle += '<option value="' + sport.data[i]._id + '">' + sport.data[i].sport + '</option>';
                        teamInput2.innerHTML = bundle;
                    }

                })
                //
                // });
            } else if (original === 'tournaments') {
                // console.log('tournaments');
                self.teamsData = 'false';
                self.tournamentsData = 'true';
                self.usersData = 'false';
                self.inboxData = 'false';
                self.announcementsData = 'false';

            } else if (self.$store.state.urlPage === 'Users') {
                // console.log('users');
                self.teamsData = 'false';
                self.tournamentsData = 'false';
                self.usersData = 'true';
                self.inboxData = 'false';
                self.announcementsData = 'false';

                //load sport
								console.log(teamInputUsers);

                axios.post('/api/tournaments/getAll').then(function(sport) {
                    console.log(sport.data);
                    bundle3 += '<option disabled value="">Please select one</option>';
                    for (var i = 0; i < sport.data.length; i++) {
                        // bundle += 'response.data[i]';
                        bundle3 += '<option value="' + sport.data[i]._id + '">' + sport.data[i].sport + '</option>';
                        teamInputUsers.innerHTML = bundle3;
                    }

                })

            } else if (self.$store.state.urlPage === 'Inbox') {
                // console.log('inbox');
                self.teamsData = 'false';
                self.tournamentsData = 'false';
                self.usersData = 'false';
                self.inboxData = 'true';
                self.announcementsData = 'false';

            }
        },
        onSubmit() {

            var inputs = document.querySelectorAll(".inputs"),
                file = document.querySelector('#file'),
                addIcon = document.querySelector('#addIcon'),
                snackBar_update = document.querySelector('#snackBar_update'),
                usersAlert = document.querySelector('#usersAlert'),
                required = document.querySelectorAll('.required'),
                formData = new FormData(),
                self = this,
                urlTitle = window.location.pathname,
                original = urlTitle.substring(1),
                w = window.innerWidth,
                source,
                teamsIds,
                teamInput = document.querySelector('#teamInput'),
                teamInputUsers = document.querySelector('#teamInputUsers'),
                data = {};

console.log(self.$store.state.urlPage);
            //Define Api destination
            if (self.$store.state.urlPage === 'Teams') {
                source = 'teams';
            } else if (original === 'tournaments') {
                source = 'tournaments';
            } else if (self.$store.state.urlPage === 'Users') {
                source = 'users';
            } else if (original === 'inbox') {
                source = 'inbox';
            } else if (original === 'announcements') {
                source = 'announcements';
            }

            //Validate
            for (var r = 0; r < required.length; r++) {
                // console.log(required[r].value);
                if (required[r].value != '') {

                    // console.log(self.selectInputs);
                    formData.append('team', teamInputUsers);

                    // teamsIds = self.teamSelected;
                    // // console.log(teamsIds);
                    // //
                    // // for (var a = 0; a < teamsIds.length; a++) {
                    // //     formData.append('teamId', teamsIds[a]);
                    // // }
                    // formData.append('teamId', teamsIds);


                    //Inputs
                    for (var i = 0; i < inputs.length; i++) {
                        formData.append(inputs[i].name, inputs[i].value);
                    }
                    //Files
                    // console.log(file.files[0]);
                    if (typeof file.files[0] != "undefined") {
                        if (file.value === '') {
                            formData.append('photo', 'default_user_logo.png');
                        } else {
                            formData.append('photo', file.files[0]);
                        }
                    } else {
                        formData.append('photo', 'default_user_logo.png');
                    }

                    //
                    // for (var value of formData.values()) {
                    //     console.log(value);
                    // }
                    var insert = '/insert';
                    if (source === 'users') {
                        insert = '/register';
                    }

                    axios.post('api/' + 'users/' + 'register',
                        formData
                    ).then(function(response) {
                        // console.log(self);
                        // self.$router.push('/reload');
                        formCon.style.display = 'none';

                        // snackBar
                        snackBar_update.innerHTML = 'User Added';
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

                        //Remove alert
                        usersAlert.style.display = 'none';
                        formContent.reset();
                    })

                    addIcon.style.display = 'block';
                    break;

                    //Reload
                    self.$router.push('/reload');
                } else {

                    //Show alert
                    usersAlert.style.display = 'block';
                    break;
                }
            }

            if (self.$store.state.urlPage === 'Teams') {
							console.log("HERE!");

                var formData = new FormData(),
                    file = document.querySelector('#file'),
                    name3 = document.querySelector('#name3'),
                    snackBar_update = document.querySelector('#snackBar_update'),
                    accountInputs = document.querySelectorAll('.accountInputs'),
                    teamInput2 = document.querySelector('#teamInput2'),
                    teamInput2 = teamInput2.options[teamInput2.selectedIndex].value;

                //insert file
                if (file.value === '') {
                    // console.log("HERE!");
                    // console.log(currentPhoto);
                    formData.append('file', 'default_team_logo.png');
                } else {
                    formData.append('file', file.files[0]);
                }

                //Insert text inputs
                formData.append('name', name3.value);

                //sport
                formData.append('sport', teamInput2);


                // Show Data
                // for (var value of formData.values()) {
                //     console.log(value);
                // }

                //insert
                axios.post('/api/teams/insert', formData).then(function(response) {});

                // snackBar
                snackBar_update.innerHTML = 'Team Added';
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

                //hide modal
                formCon.style.display = 'none';
                addIcon.style.display = 'block';

                //Reload
                self.$router.push('/reload');



            } else
                console.log(self.$store.state.urlPage);
            if (self.$store.state.urlPage === 'Tournaments') {

                var self = this,
                    formData = new FormData(),
                    iconInput = document.querySelector('#iconInput'),
                    bannerInput = document.querySelector('#bannerInput'),
                    promoBannerInput = document.querySelector('#promoBannerInput');

                //text inputs
                formData.append('sport', self.updateSport);
                formData.append('type', self.updateType);
                formData.append('rules', self.updateRules);
                formData.append('capacity', self.updateCapacity);
                formData.append('amount', '0');
                formData.append('promoBannerColor', self.updateRgba);
                formData.append('genderIcon', 'male.png');

                //Date inputs
                formData.append('startDate', self.updatestartDate);
                formData.append('endDate', self.updateEndDate);
                formData.append('startDateName', self.updatestartDateName);
                formData.append('endDateName', self.updateEndDateName);

                //file Inputs
                // console.log(iconInput.value);
                if (iconInput.value === '') {
                    formData.append('icon', self.icon);
                } else {
                    formData.append('icon', iconInput.files[0]);
                }

                if (bannerInput.value === '') {
                    formData.append('banner', self.banner);
                } else {
                    formData.append('banner', bannerInput.files[0]);
                }

                if (promoBannerInput.value === '') {
                    formData.append('promoBanner', self.promoBanner);
                } else {
                    formData.append('promoBanner', promoBannerInput.files[0]);
                }

                // Display the values
                for (var value of formData.values()) {
                    console.log(value);
                }

                // Send
                axios.post('/api/tournaments/insert', formData).then(function(response) {

                })

                // snackBar
                snackBar_update.innerHTML = 'Tournament Added';
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

                //hide modal
                formCon.style.display = 'none';
                addIcon.style.display = 'block';

                //Reload
                self.$router.push('/reload');

            }

        },
        cancelForm() {
            formCon.style.display = 'none';
            addIcon.style.display = 'block';

        }
    }

}
</script>

<style lang="scss">
#addIcon {
    right: 18px;
    bottom: 18px;
    position: fixed;
    width: 50px;
    height: 50px;
    background-color: #009587;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 4;
    img {
        width: 12px;
    }

}
.selectCon {
    height: auto;
    // border: 1px solid grey;
    width: 70%;
    margin: 0 auto;
    p {
        color: #009587;
    }
    .selectInner {
        height: auto;
        max-height: 100px;
    }
}
#usersAlert {
    color: red;
    display: none;
}
#formCon {
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 5;
    top: 0;
    label {
        width: 70%;
        margin: 0 auto;
        display: block;
    }
    select {
        width: 70%;
        margin: 0 auto;
        display: block;
    }
    #form {
        width: 100%;
        height: 100%;
        background-color: white;
        position: absolute;
        z-index: 3;
        top: 0;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
        border-radius: 2px;

        #formTitle {
            background-color: white;
            height: 10%;
            width: 100%;
            text-align: center;
            position: relative;
            p {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-weight: 500;
            }
        }
        #formContent {
            // background-color: green;
            height: 80%;
            width: 100%;
            padding-top: 5px;
            padding-left: 25px;
            padding-right: 25px;
            overflow: scroll;
            overflow-x: hidden;
            .input-group__details:after {
                background-color: #009587 !important;

            }
            input::-webkit-input-placeholder {
                color: #009587 !important;
            }
            input {
                border-bottom: thin solid #E0E0E0;
                width: 70%;
                margin: 0 auto;
                display: block;
                margin-bottom: 30px;

            }

        }
        #move {
            width: 30px;
            float: left;
        }
        #formBtns {
            // background-color: yellow;
            height: 10%;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            box-shadow: 0 -4px 5px 0 rgba(0,0,0,0.19);
            #innerDivForm {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 300px;
                .formCancelBtn {
                    border-color: #e2231a !important;
                    color: #e2231a !important;
                    width: 100px;
                    p {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
                .formSubmitBtn {
                    float: right;
                    background-color: red !important;
                    p {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }
    }

}
@media (min-width: 600px) {

    #form {
        width: 70% !important;
        height: 80% !important;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    #addIcon {
        bottom: auto;
        top: 123px;
        position: fixed;
    }

}
@media (min-width: 800px) {

    #form {
        width: 600px !important;

    }

}
</style>
