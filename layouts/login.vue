<template lang="html">
	<div id="mainCon">

<div id="loginCon">
	<img src="~assets/img/loginLogo.png" alt="fanshawe intramurals logo" id="loginLogo" />

  <form id="myForm" name="myForm " action="#" method="post" @keyup.enter="submit_form">

  <label for="email">Email</label>
  <input type="email" name="email" id="email_input">

  <label for="password" >Password</label>
  <input type="password" name="password" id="password_input" @keyup.enter="submit_form">

  <p id="login_error"></p>

 </form>

 <button type="button" id="loginSubmitbtn"  @click='submit_form'>Login</button>
		<p class="question">Don't Have an Account? <span style="color:red !imporant"><a href="register">Register</a>
</span></p>
</div>

</div>

</template>

<script>
import axios from '~/plugins/axios';

export default {

	methods: {
		submit_form: function() {
			var self = this,
				email_input = document.querySelector('#email_input').value,
				password_input = document.querySelector('#password_input').value,
				login_error = document.querySelector('#login_error'),
				data,
				id,
				userData;
			// console.log(email_input);
			//Validation
			if (email_input === '' && password_input === '') {
				login_error.innerHTML = '*Please fill all Inputs';
			} else
			if (email_input === '') {
				login_error.innerHTML = '*Please include an email';
			} else if (password_input === '') {
				login_error.innerHTML = '*Please include a apassword';
			}

			data = {
				// _token: csrf_field,
				email: email_input,
				password: password_input
			};
			// console.log(data);
			axios.post('/login', {
					data: data
				})
				.then(function(response) {
					// console.log(response.data);
					if (response.data === false) {
						// console.log(response);
						login_error.innerHTML = "Incorect Credentials, please try again.";

					} else {
						userData = response.data;
						// console.log(userData);
						redirect(self, userData);
					}
				})
				.catch(function(error) {
					// console.log(error);
				});

			function redirect(self, userData) {
				// console.log(self.$store);
				//Set User Data
				self.$store.commit('set', userData);
				// console.log(userData.team[0]);

				// Get Users Team Information
				axios.post('/api/teams/getOne', {
					id: userData.team
				}).then(function(response) {
					self.$store.commit('set_userDataTeam', response.data);
				})

				//Get players from the same team
				axios.post('/api/users/teamMates', {
					id: userData.team
				}).then(function(response) {
					// console.log(response.data);
					self.$store.commit('set_userDataTeamMates', response.data);
					// console.log(self.$store.state.userData.type);

					//Set user type
					if (self.$store.state.userData.type === 'admin') {
						self.$store.commit('set_clientORcms', 'cms');
						self.$router.push('/teams');
					} else {
						self.$store.commit('set_clientORcms', 'student');
						self.$router.push('/fixtures');
					}
				}).catch((e) => {
					console.log(e);
				})
			}

		}
	}
}
</script>

<style lang="scss">
.question {
    text-align: center;
    bottom: 70px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
    padding-bottom: 100px;
}
#login_error {
    color: red;
    text-align: center;
}
#loginSubmitbtn {
    background-color: red;
    width: 100%;
    color: white;
    font-family: Roboto, san-serif;
    position: fixed;
    bottom: 0;
    height: 50px;
    font-weight: bold;
    z-index: 4;

}
#loginLogo {
    width: 160px;
    display: block;
    margin: 50px auto 0;
}
#mainCon {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: red;
    position: absolute;
}
#loginCon {
    width: 100%;
    height: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 100;
    border-radius: 2px;

}
#myForm {
    width: 80%;
    display: block;
    margin: 50px auto 0;
    input {
        width: 100%;
        margin-bottom: 20px;

    }
}
@media (min-width: 600px) {
    .question {
        text-align: center;
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 12px;
    }
    #loginLogo {
        width: 250px;
        display: block;
        margin: 50px auto 0;
    }
    #loginCon {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        width: 80%;
        height: 650px;
        background-color: white;
        max-width: 350px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;

    }
    #loginSubmitbtn {
        width: 200px;
        margin: 0;
        position: absolute;
        border-radius: 2px;
        bottom: 40px;
        left: 50%;
        transform: translate( -50%);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
}
</style>
