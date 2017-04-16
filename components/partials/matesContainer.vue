<template lang="html">
	    <div id="matesContainer">
	        <img :src="'userPhotos/' + result.photo" alt="Profile Picture" v-for="result in userDataTeamMates" @click="openMember(result._id)">
					<div id="mateModaldash">
						<div>
							<img src="~assets/img/cancelBlack.svg" alt="Qualifieng Team logo" @click="closeModal" id="noborderr">
						</div>
						<div>
							<img :src="'/userPhotos/' + mateInfo.photo" alt="Qualifieng Team logo" class="roundImg">
						</div>
						<div id="matedModalPadding">
							<p class="text-xs-center">{{mateInfo.fname}} {{mateInfo.lname}}</p>
							<h5 class="bold">Get in touch:</h5>
							<p>email: {{mateInfo.email}}</p>
							<p>number: {{mateInfo.number}}</p>
						</div>
					</div>
	    </div>
</template>

<script>
import axios from '~plugins/axios';

export default {
    created() {
        //do something after creating vue instance
        var a_updateButton = document.querySelector('#a_updateButton'),
            self = this;

       

    },
    data() {
        return {
            userDataTeamMates: this.$store.state.userDataTeamMates,
            mateInfo: ''
        }
    },
    methods: {
        openMember(id) {
            // console.log(id);

            //Dropdown
            TweenMax.to("#mateModaldash", .3, {
                top: 102,
                ease: Power2.easeInOut
            });


            var self = this;
            axios.post('/api/users/getOne', {
                id: id
            }).then(function(response) {
                // console.log(response.data[0]);
                self.mateInfo = response.data[0];
            })
        },
        closeModal() {
            //Dropdown
            TweenMax.to("#mateModaldash", .2, {
                top: -600,
                ease: Power2.easeInOut
            });
        }
    }
}
</script>

<style lang="scss">
#matesContainer {
    display: none;
}
#noborderr {
    box-shadow: none !important;
}
#mateModaldash {
    background-color: white;
    height: 300px;
    width: 400px;
    position: absolute;
    z-index: 4;
    top: -600px;
    border-radius: 2px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    img {
        width: 15px;
        position: absolute;
        right: 15px;
        top: 15px;
    }
}
#matedModalPadding {
    padding-left: 40px;
    padding-right: 40px;
}
@media (min-width: 600px) {
    #matesContainer {
        display: block;
        height: auto;
        // background: black;
        position: absolute;
        width: auto;
        top: 80px;
        left: 235px;
        top: 270px;

        img {
            width: 40px;
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            margin-right: 10px;
            cursor: pointer;
            :hover {
                display: none;
            }
        }
    }
}
</style>
