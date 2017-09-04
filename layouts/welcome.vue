<template>
<div id="welcomeContainer">
    <div id="snackBar">
        Update Successful
    </div>
    <div id="welcomeModal">
        <div id="w_modalTop">
            <img src="~assets/img/cancelBlack.svg" alt="" @click="closeModal" id="w_closemodal">
            <h2>{{ tournamentOne.sport }}</h2>
            <div id="m_information">
                <div>
                    <p>Type</p>
                    <img :src="'/sportBanners/' + tournamentOne.genderIcon" alt="gender Icon" id="modalTypeImg">
                </div>
                <div>
                    <p>Start Date</p>
                    <p>{{ tournamentOne.startDateName }}</p>
                </div>
                <div>
                    <p>End Date</p>
                    <p>{{ tournamentOne.endDateName }}</p>
                </div>
                <div>
                    <p>Capacity</p>
                    <p>{{ tournamentOne.amount }}/{{ tournamentOne.capacity }}</p>
                </div>
            </div>
            <div id="w_modalDesc">
                <h4>Rules</h4>
                <p>{{ tournamentOne.rules }}</p>
            </div>
        </div>
        <div id="w_modalMid">
            <div v-if="teamList == ''">
                <p id="noteamText">No teams Available. Join as a Free Agent and we will notify you when there is a team available.</p>
            </div>
            <div class="w_teamItem" v-for="item in teamList" :key="teamList.key" v-else>
                <div>
                    <img :src="'teamLogos/' + item.file" alt="">
                </div>
                <div>
                    <p>{{ item.name }}</p>
                </div>
                <div @click="teamPick(item._id)">
                    <v-btn class="red white-text">Join</v-btn>
                </div>
            </div>

        </div>
        <div id="w_modalBottom">
            <div @click="freeAgent()">
                <v-btn outline class="blue-grey-text">Free Agent</v-btn>

            </div>
        </div>
    </div>

    <div id="newUserShow">
        <div id="welcomeIntro">
            <div id="welcomeBtns" v-if="userData === false">
                <div>
                    <router-link to="/register">
                        <v-btn outline class="red red-text">Sign up</v-btn>
                    </router-link>

                    <router-link to="/login">
                        <v-btn warning dark class="red white-text">Log in</v-btn>
                    </router-link>
                </div>

            </div>
            <div id="welcomeBtns2" v-else>
                <div>
                    <router-link to="/account">
                        <v-btn warning dark class="red white-text">Go Home</v-btn>
                    </router-link>
                </div>
            </div>
        </div>
    </div>


    <div id="sportsList">

        <div class="sportsContainer" v-bind:style="'backgroundColor:rgba('+ result.promoBannerColor+ ')'" v-for="result in tournamentInfo">
            <img :src="'/sportBanners/' + result.promoBanner" alt="promo banner" class="promoBanner">

            <div>
                <h2>{{result.sport}}</h2>
            </div>

            <div>
                <img :src="'/sportBanners/' + result.icon" alt="sport icons" id="sportIcon">
            </div>

            <div @click="openModal(result._id)">
                <v-btn outline class="white--text">Join</v-btn>
            </div>
            <div class="sportinfo">
                <div>
                    <p>Type</p><img :src="'/sportBanners/' + result.genderIcon" alt="gender Icon"></div>
                <div>
                    <p>Start Date</p>
                    <p>{{result.startDateName}}</p>
                </div>
                <div>
                    <p>End Date</p>
                    <p>{{result.endDateName}}</p>
                </div>
                <div>
                    <p>Capacity</p>
                    <p>{{result.amount}}/{{result.capacity}}</p>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import axios from "axios"
export default {
    data() {
        return {
            tournamentInfo: '',
            tournamentOne: '',
            teamList: '',
            userData: ''
        }
    },
    mounted: function mounted() {
        var self = this,
            welcomeModal = document.querySelector('#welcomeModal');
        axios.post('/api/tournaments/getAll').then(function(response) {
            // console.log(response.data);
            self.tournamentInfo = response.data;
        })

        // console.log(self.$router);
        this.userData = this.$store.state.userData;

    },
    methods: {
        openModal(sportId) {
            // console.log("HERE!" + sportId);
            var self = this,
                w = window.innerWidth,
                snackBar = document.querySelector('#snackBar');

            //set selected tournaments id



            //if not registered show alert
            // console.log(self.userData);
            if (self.userData === false) {

                //show Error
                snackBar.innerHTML = 'Sign Up to join a sport'
                if (w <= 600) {
                    TweenMax.to('#snackBar', .1, {
                        bottom: 0
                    });
                    TweenMax.to('#snackBar', .3, {
                        bottom: '-600px',
                        delay: 2
                    });
                } else {
                    TweenMax.to('#snackBar', .4, {
                        bottom: 0,
                        delay: .2
                    });
                    TweenMax.to('#snackBar', .4, {
                        bottom: '-500px',
                        delay: 4
                    });
                }
            } else {

                //Show MOdal
                welcomeModal.style.display = 'grid';

                //Get Tournmanet Information
                axios.post('/api/tournaments/getOne', {
                    data: sportId
                }).then(function(response) {
                    // console.log(response.data[0]);
                    self.tournamentOne = response.data[0];
                    self.$store.commit('set_selectedTournament', response.data[0]._id);
                })

                //Get Tournmanet teams
                axios.post('/api/tournaments/teams', {
                    data: sportId
                }).then(function(response) {
                    // console.log(response.data);
                    self.teamList = '';
                    self.teamList = response.data;
                })
            }

        },
        closeModal() {
            welcomeModal.style.display = 'none';
        },
        teamPick(teamId) {
            var bundle = {},
                self = this;


            //get tournament from selected team
            axios.post('/api/teams/getOne', {
                id: teamId
            }).then(function(response) {
              bundle.sportId = response.Data._id;
            });
            bundle.teamId = teamId;
            bundle.userId = this.$store.state.userData._id;
            // console.log(bundle);


            axios.post('/api/users/updateTeam', {
                data: bundle
            }).then(function(response) {

                //Chage stores user Information
                // console.log(self.$store);
                //Set User Data
                // console.log(response.data);
                self.$store.commit('set', response.data);
                // console.log(userData);

                // Get Users Team Information
                axios.post('/api/teams/getOne', {
                    id: response.data.team[0]
                }).then(function(responsee) {
                    self.$store.commit('set_userDataTeam', responsee.data);
                })

                //Get players from the same team
                axios.post('/api/users/teamMates', {
                    id: response.data.team
                }).then(function(responseee) {
                    // console.log(response.data);
                    self.$store.commit('set_userDataTeamMates', responseee.data);
                    // console.log(self.$store.state);
                    self.$router.push('/account');

                })

            })

        },
        freeAgent() {

            var bundle = {},
                self = this;

            // console.log(self.$store.state.selectedTournament);

            bundle.torunament = self.$store.state.selectedTournament;
            bundle.userId = this.$store.state.userData._id;
            // console.log(bundle);

            axios.post('/api/users/freeAgent', {
                data: bundle
            }).then(function(response) {

                self.$store.commit('set', response.data);

                // Get Users Team Information
                self.$store.commit('set_userDataTeam', false);

                //Get players from the same team
                self.$store.commit('set_userDataTeamMates', false);

                self.$router.push('/account');
            })
        }
    }
}
</script>
<style lang="scss">
#backBar {
    background-color: red;
    height: 42px;
    img {
        width: 30px;
        margin-left: 10px;
        margin-top: 5px;
    }
}
#snackBar {
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 5;
    left: 50%;
    bottom: -800px;
}
#welcomeModal {
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    z-index: 2;
    border-radius: 2px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 300px 1fr 50px;
    display: none;
    overflow: hidden;

    #w_modalTop {
        // background-color: red;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        display: grid;

        img {
            width: 20px;
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }
        h2 {
            text-align: center;
        }
        #m_information {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            text-align: center;
        }
        #w_modalDesc {
            overflow: scroll;
            width: 90%;
            margin: 0 auto;
            display: block;
            overflow-x: hidden;
        }
        h4 {
            margin-bottom: 3px;
            font-weight: bold;
        }
    }
    #w_modalMid {
        // background-color: green;
        overflow: scroll;
        overflow-x: hidden;
        .w_teamItem {
            display: grid;
            height: auto;
            width: 90%;
            margin: 20px auto 0;
            grid-template-columns: 1fr 2fr 1fr;
            text-align: left;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            div {
                justify-self: center;
            }
            img {
                width: 70px;
            }
            p {
                margin-top: 25px;
                text-align: left;
                font-size: 15px;
            }
            button {
                margin-top: 20px;

            }

        }
    }
    #w_modalBottom {
        button {
            display: block;
            margin: 5px auto 0;
        }
    }

}
#noteamText {
    font-size: 20px;
    color: #9E9E9E;
    width: 50%;
    margin: 50px auto 0;
}
#modalTypeImg {
    position: static !important;
}
#welcomeBtns {
    width: 290px;
    display: block;
    margin: auto;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    button {
        width: 130px;
    }
}
#welcomeBtns2 {
    @extend #welcomeBtns;
    width: 130px;

}
#welcomeIntro {
    background-image: url('~assets/img/sportBanners/welcome-intro.jpg');
    height: 300px;
    background-size: contain;
    background-position: center;
    width: 100%;
    position: relative;
}
.promoBanner {
    width: 100%;
    position: absolute;
    z-index: -2;
    height: 100%;
    object-fit: cover;

}

#sportsList {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    overflow: hidden;
}
.sportinfo {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 30px;
    width: 90%;
    margin: 0 auto;
    p {
        color: white;
        font-size: 13px;
    }
    img {
        width: 20px;
    }
}
.sportsContainer {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
    height: 300px;
    position: relative;
    h2 {
        font-size: 18px;
        font-weight: bold;
        color: white;
    }

    #sportIcon {
        width: 40px;
    }
}
@media screen and (min-width: 600px) {
    #sportsList {
        display: grid;
        grid-template-columns: repeat(2, 1fr);


    }
    #snackBar {
        bottom: -500px;
    }
    #welcomeModal {
        width: 80%;
        height: 80%;
        max-width: 800px;
        background: white;
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        top: 0;
        bottom: 0;
        z-index: 2;
        border-radius: 2px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto;
        // grid-template-rows: 300px 1fr 90px;
        padding: 10px;

    }
    #w_modalTop {
        // background-color: red;
        box-shadow: none !important;
        overflow: hidden;

    }
    #w_modalMid {
        // background-color: red;
        margin-top: 50px;
    }
    .w_teamItem {
        margin-top: 0 !important;
        margin-bottom: 20px !important;
    }

}
</style>
