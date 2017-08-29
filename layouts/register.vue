<template lang="html">
	<div id="mainCon">

<div id="registerCon">
	<img src="~assets/img/loginLogo.png" alt="fanshawe intramurals logo" id="registerLogo" />

  <form id="myForm" name="myForm " action="#" method="post" @keyup.enter="submit">
<div id="fnamelname">
<div>
	<label for="fname">First Name</label>
  <input type="text" name="fname" id="fname_input" class="regInputs">
</div>
<div>
	<label for="lname">Last Name</label>
  <input type="text" name="lname" id="lname_input" class="regInputs">
</div>
</div>
  <label for="file">Photo Upload</label>
  <input type="file" name="file" id="file">

  <label for="email">Email</label>
  <input type="text" name="email" id="email_input" class="regInputs">

  <label for="password" >Password</label>
  <input type="password" name="password" id="password_input" class="regInputs">

  <p id="register_error"></p>

 </form>

 <button type="button" id="registerSubmitbtn"  @click='submit_form'>Register</button>
 <p class="question">Have an Account? <span style="color:red !imporant"><a href="login">Login</a>
 </span></p>
</div>

</div>

</template>

<script>
import axios from 'axios';

export default {

    methods: {
        submit_form: function() {
            var self = this,
                email_input = document.querySelector('#email_input').value,
                password_input = document.querySelector('#password_input').value,
                fname_input = document.querySelector('#fname_input').value,
                lname_input = document.querySelector('#lname_input').value,
                register_error = document.querySelector('#register_error'),
                file = document.querySelector('#file'),
                formData = new FormData(),
                regInputs = document.querySelectorAll('.regInputs'),
                data,
                id,
                authUser,
                userData;

            //Validation
            if (email_input === '' && password_input === '') {
                register_error.innerHTML = '*Please fill all Inputs';
            } else if (email_input === '') {
                register_error.innerHTML = '*Please include an email';
            } else if (password_input === '') {
                register_error.innerHTML = '*Please include a apassword';

            } else if (fname_input === '') {
                register_error.innerHTML = '*Please include your First Name';

            } else if (lname_input === '') {
                register_error.innerHTML = '*Please include your Last Name';
            } else if (email_input != '' && password_input != '' && email_input != '' && password_input != '' &&
                fname_input != '' &&
                lname_input != '') {

                //Data
                if (file.value === '') {
                    formData.append('photo', 'default_user_logo.png');
                } else {
                    formData.append('photo', file.files[0]);
                }


                for (var i = 0; i < regInputs.length; i++) {
                    formData.append(regInputs[i].name, regInputs[i].value);
                }

								//show bundle data
                // for (var value of formData.values()) {
                //     console.log(value);
                // }

                // console.log(data);
                axios.post('/api/users/register', formData)
                    .then(function(response) {
                        // console.log(response.data);
                        userData = response.data[0];
                        // console.log(userData);
                        redirect(self, userData);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                function redirect(self, userData) {
                  // console.log(self);

                    self.$store.commit('set', userData);
                    // console.log(self.$store.state.userData);
                    self.$router.push('/welcome');


                }

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
#myForm {
    // padding-bottom: 100px;
}
#register_error {
    color: red;
    text-align: center;
}
#registerSubmitbtn {
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
#registerLogo {
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
#registerCon {
    width: 100%;
    height: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 100;
    border-radius: 2px;
    overflow: scroll;
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
#fnamelname {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 20px;
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
    #fnamelname {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 20px;
    }
    #registerSubmitbtn {
        background-color: red;
        width: 100%;
        color: white;
        font-family: Roboto, san-serif;
        position: absolute;
        bottom: 0;
        height: 50px;

    }
    #registerLogo {
        width: 200px;
        display: block;
        margin: 50px auto 0;
    }
    #registerCon {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        width: 80%;
        height: 760px;
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
    #registerSubmitbtn {
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
