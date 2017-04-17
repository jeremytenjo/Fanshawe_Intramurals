<template>
<div id="tournamentsContainer">

    <div id="sportList">
        <div class="sportItem" @click="showDetails(elem._id)" v-for="elem in list" :key="elem.key">
            <div>
                <img :src="'sportIcons/' + elem.icon" alt="sport icon">
            </div>
            <div>
                <p>{{elem.sport}}</p>
            </div>
            <div>
                <img :src="'genderIcons/'+ elem.genderIcon" alt="gender icon">
            </div>
        </div>



    </div>
    <div id="sportDetailsContainer">

        <div id="sportDetails">
            <div id="sportDetailesHeader">

                <img src="~assets/img/back.svg" alt="back button" @click="hideDetails">

                <div @click="showDetailsHeader">
                    <v-btn outline small class="cyan cyan-text" id="showDetailsBTN">Show Details</v-btn>
                </div>
            </div>
            <div id="sportDetailesContent">
                <div class="overflowScroll">

                    <label for="sport">Sport</label>
                    <input type="text" name="sport" v-model="updateSport">

                    <label for="Type">Type</label>
                    <input type="text" name="Type" v-model="updateType">

                    <label for="Capacity">Capacity</label>
                    <input type="text" name="Capacity" v-model="updateCapacity">

                    <label for="rules">Rules</label>
                    <textarea rows="30" name="rules" v-model="updateRules"></textarea>

                    <label for="banner">Banner</label>
                    <input type="file" name="banner" id="bannerInput">
                    <br>
                    <br>
                    <label for="promoBanner">Promo Banner</label>
                    <input type="file" name="promoBanner" id="promoBannerInput">
                    <br>
                    <br>
                    <label for="rbgaInput">Gradient Color (RGBA)</label>
                    <input type="text" name="rbgaInput" v-model="updateRgba">

                    <label for="startDate">Start Date (<span class="bold">Currently: {{updatestartDateName}}</span>)</label>
                    <input type="text" name="startDate" v-model="updatestartDate">

                    <label for="endDate">End Date (<span class="bold">Currently: {{updateEndDateName}}</span>)</label>
                    <input type="text" name="endDate" v-model="updateEndDate" placeholder="DDMMYYYY">

                    <div id="teamLogosList">
                        <div v-for="team in teams" :key="team.key">
                            <md-avatar>
                                <img :src="'teamLogos/'+ team.file " alt="team logo">
                                <md-tooltip md-direction="top">{{team.name}}</md-tooltip>
                            </md-avatar>
                        </div>
                    </div>

                </div>
                <div id="sportsUpdateContainer">
                    <div @click="update">
                        <v-btn class="red white--text">update</v-btn>
                    </div>

                </div>
            </div>
        </div>

        <div id="sportGames">
            <div id="sportGamesHeader">
                <div>
                    Games
                </div>
                <div @click="addGame('dialog2')" id="fab">
                    <i class="material-icons">add</i>
                </div>
                <!-- <div >
                <i class="material-icons">filter_list</i>
              </div> -->
            </div>


            <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
                <md-dialog-title>Add Game</md-dialog-title>
                <md-dialog-content>
                    <form>
                        <md-input-container>
                            <label>Name</label>
                            <md-input v-model="name"></md-input>
                        </md-input-container>
                    </form>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click.native="closeGame('dialog2')">Cancel</md-button>
                    <md-button class="md-primary" @click.native="closeGame('dialog2')">Add</md-button>
                </md-dialog-actions>
            </md-dialog>


        </div>
    </div>
</div>
</template>
<script>
import axios from '~plugins/axios';

export default {
    middleware: 'auth',
    data() {
        return {
            name: '',
            list: '',
            updateSport: '',
            updateType: '',
            updateCapacity: '',
            updateInput: '',
            updateRules: '',
            updateRgba: '',
            updatestartDate: '',
            updatestartDateName: '',
            updateEndDate: '',
            updateEndDateName: '',
            teams: '',
            games: ''

        }
    },
    mounted() {
        var addIcon = document.querySelector('#addIcon'),
            self = this;

        //show add button
        addIcon.style.display = 'block';

        //load initial list and sport
        axios.post('/api/tournaments/getAll').then(function(response) {
            // console.log(response.data);

            //List
            self.list = response.data;

            // fill update form
            self.updateSport = response.data[0].sport;
            self.updateType = response.data[0].type;
            self.updateCapacity = response.data[0].capacity;
            self.updateRules = response.data[0].rules;
            self.updateRgba = response.data[0].promoBannerColor;
            self.updatestartDate = response.data[0].date;
            self.updatestartDateName = response.data[0].startDateName;
            self.updateEndDateName = response.data[0].endDateName;

            //load teams
            axios.post('/api/tournaments/teams', {
                data: response.data[0]._id
            }).then(function(response) {
                // console.log(response);
                self.teams = response.data;
            })

            //Load Games
            axios.post('/api/games/allBy', {
                id: response.data[0]._id
            }).then(function(response) {
                console.log(response);
            })

        })



    },
    methods: {
        showDetails(id) {
            var sportList = document.querySelector('#sportList'),
                tournamentsContainer = document.querySelector('#tournamentsContainer'),
                sportDetailsContainer = document.querySelector('#sportDetailsContainer'),
                w = window.innerWidth,
                self = this;

            //mobile hide list show details and games
            if (w <= 600) {
                sportList.style.display = 'none';
                sportDetailsContainer.style.display = 'grid';
            }

            //load selected list and sport
            axios.post('/api/tournaments/getOne', {
                data: id
            }).then(function(response) {
                // console.log(response.data);

                // fill update form
                self.updateSport = response.data[0].sport;
                self.updateType = response.data[0].type;
                self.updateCapacity = response.data[0].capacity;
                self.updateRules = response.data[0].rules;
                self.updateRgba = response.data[0].promoBannerColor;
                self.updatestartDate = response.data[0].date;
                self.updatestartDateName = response.data[0].startDateName;
                self.updateEndDateName = response.data[0].endDateName;

                //load teams
                axios.post('/api/tournaments/teams', {
                    data: response.data[0]._id
                }).then(function(response) {
                    // console.log(response);
                    self.teams = response.data;
                })
            })
        },
        hideDetails() {
            var sportList = document.querySelector('#sportList'),
                tournamentsContainer = document.querySelector('#tournamentsContainer'),
                sportDetailsContainer = document.querySelector('#sportDetailsContainer'),
                w = window.innerWidth,
                self = this;

            //mobile hide details show list
            if (w <= 600) {
                sportList.style.display = 'block';
                sportDetailsContainer.style.display = 'none';
            }
        },
        showDetailsHeader() {
            var showDetailsBTN = document.querySelector('#showDetailsBTN').childNodes[0],
                sportDetailesContent = document.querySelector('#sportDetailesContent'),
                sportsUpdateContainer = document.querySelector('#sportsUpdateContainer');

            //change button text
            // console.log(showDetailsBTN.innerHTML);
            if (showDetailsBTN.innerHTML === 'Show Details') {
                showDetailsBTN.innerHTML = 'Hide Details';

                //show details
                TweenMax.to('#sportDetailesContent', .4, {
                    height: 'calc(100vh / 2 - 42px)'
                });
                sportsUpdateContainer.style.display = 'block';

            } else {
                showDetailsBTN.innerHTML = 'Show Details';

                //Hide details
                TweenMax.to('#sportDetailesContent', .4, {
                    height: 0
                });
                sportsUpdateContainer.style.display = 'none';

            }

        },
        update() {

        },
        addGame(ref) {
            this.$refs[ref].open();
        },
        closeGame(ref) {
            this.$refs[ref].close()
        }

    }
}
</script>
<style lang="scss">
#tournamentsContainer {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
}
#sportList {
    display: block;

    padding: 10px;
    overflow: scroll;
    overflow-x: hidden;
    height: calc(100vh - 42px);
    padding-bottom: 90px;

    .sportItem {
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        padding: 10px;
        text-align: left;
        cursor: pointer;
        margin: 10px;
        img {
            width: 40px;
            margin: 0 auto;
            display: block;

        }
        p {
            padding-top: 10px;
        }

    }
}

#sportDetailsContainer {
    // background: yellow;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    display: none;
}
#sportDetails {
    #sportDetailesHeader {
        height: 50px;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

        img {
            float: left;
            width: 30px;
            margin-top: 10px;
            margin-left: 20px;
            cursor: pointer;
        }
        button {
            float: right;
            margin-right: 20px;
            margin-top: 10px;
            span {
                height: 15px;
            }
        }
    }
    #sportDetailesContent {
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        height: 0;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 1fr 40px;
        padding-left: 10px;
        padding-right: 10px;
        overflow: hidden;

        #sportsUpdateContainer {
            display: none;
            button {
                margin: 0 auto;
                display: block;
            }
        }
    }
}
#teamLogosList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 10px;
    width: 300px;
    margin: 0 auto;
}
#sportGames {
    padding: 15px;

    #sportGamesHeader {
        display: grid;
        grid-template-columns: 4fr 0.5fr;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    }
}
@media screen and (min-width: 600px) {
    .sportItem {
        height: 50px;
        p {
            margin-top: -7px;
            padding-left: 10px;
        }
    }
    #tournamentsContainer {
        grid-template-columns: 1fr 3fr;
    }
    #sportList {
        height: calc(100vh - 155px);
        padding-bottom: 0;
        display: block !important;
    }
    #sportDetailsContainer {
        grid-template-columns: repeat(2, 1fr);
        display: grid;
        display: grid !important;
    }
    #sportDetailesHeader {
        display: none;
    }
    #sportDetailesContent {
        height: calc(100vh - 155px) !important;
        box-shadow: none !important;
    }
    #sportsUpdateContainer {
        display: block !important;
    }
}
</style>
