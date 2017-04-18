<template>
<div id="tournamentsContainer">

    <div id="sportList">
        <div class="sportItem" @click="showDetails(elem._id)" v-for="elem in list" :key="elem.key">
            <div>
                <img :src="'sportBanners/' + elem.icon" alt="sport icon">
            </div>
            <div>
                <p>{{elem.sport}}</p>
            </div>
            <div>
                <!-- <img :src="'genderIcons/'+ elem.genderIcon" alt="gender icon"> -->
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

        <div id="sportGamesContainer">

            <!--  Header-->
            <div id="sportGamesHeader">
                <div>
                    Games
                </div>
                <div @click="openGame('addGameForm')" id="addGameFormCon">
                    <i class="material-icons">add</i>
                </div>
            </div>

            <!-- add game form -->
            <md-dialog md-open-from="#addGameFormCon" md-close-to="#addGameFormCon" ref="addGameForm">
                <md-dialog-title>Add Game</md-dialog-title>
                <md-dialog-content>
                    <form>
                        <label for="teamOne">Team One</label>
                        <select name="" id="teameOne">
                          <option :value="item._id" name="teamOne" v-for="item in teams" :key="item.key">{{item.name}}</option>
                        </select>

                        <label for="teamtwo">Team Two</label>
                        <select name="" id="teamTwo">
                          <option :value="item._id" name="teamtwo" v-for="item in teams" :key="item.key">{{item.name}}</option>
                        </select>

                        <label for="date">Date</label>
                        <input type="date" v-model="addDate">

                        <label for="time">Time</label>
                        <input type="text" v-model="addTime">

                        <label for="location">Location</label>
                        <input type="text" v-model="addLocation">

                        <label for="group">Group</label>
                        <input type="number" v-model="addGroup">
                    </form>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click.native="closeGame('addGameForm')">Cancel</md-button>
                    <md-button class="md-primary" @click.native="addGame('addGameForm')">Add</md-button>
                </md-dialog-actions>
            </md-dialog>

            <!-- Game List -->
            <div id="gameList">

                <div class="gameItem" v-for="item in games" :key="item.key">

                    <div>
                        <img :src="'teamLogos/' + item.teamOne[0].file" alt="team logo">
                        <p class="alignCenter">{{item.teamOne[0].name}}</p>
                    </div>
                    <div>
                        <p class="alignCenter vsGame">Vs</p>
                    </div>
                    <div>
                        <img :src="'teamLogos/' + item.teamTwo[0].file" alt="team logo">
                        <p class="alignCenter">{{item.teamTwo[0].name}}</p>
                    </div>
                    <div>
                        <ul>
                            <li>{{item.dateString}}</li>
                            <li>{{item.location}}</li>
                            <li>{{item.time}}</li>
                        </ul>
                    </div>
                    <div>
                        <p class="alignCenter">score</p>

                        <div class="alignCenter fSize">
                            <span class="md-headline">{{item.scoreTeamOne}}</span> -
                            <span class="md-headline">{{item.scoreTeamTwo}}</span>

                            <div @click="openScore('addScoreForm', item.teamOne[0]._id, item.teamTwo[0]._id, item._id)" id="addScoreFormCon">
                                <v-btn light flat class=" teal white--text">Add</v-btn>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <!-- add score form -->
            <md-dialog md-open-from="#addScoreFormCon" md-close-to="#addScoreFormCon" ref="addScoreForm">
                <md-dialog-title>Add Score</md-dialog-title>
                <md-dialog-content>
                    <form>
                        <label for="scoreOne">Score team One</label>
                        <input type="text" v-model="scoreOne">

                        <label for="scoreTwo">Score team two</label>
                        <input type="text" v-model="scoreTwo">
                    </form>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click.native="closeGame('addScoreForm')">Cancel</md-button>
                    <md-button class="md-primary" @click.native="addScore('addScoreForm')">Add</md-button>
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
            games: '',
            score: '',
            id: '',
            banner: '',
            icon: '',
            promoBanner: '',
            addDate: '',
            addTime: '',
            addLocation: '',
            addGroup: '',
            selectedTeamOne: '',
            selectedTeamTwo: '',
            scoreOne: '',
            scoreTwo: '',
            gameId: ''

        }

    },
    mounted() {
        var addIcon = document.querySelector('#addIcon'),
            self = this,
            teameOne = document.querySelector('#teameOne'),
            teamTwo = document.querySelector('#teamTwo');

        //show add button
        addIcon.style.display = 'block';

        //load initial list and sport
        axios.post('/api/tournaments/getAll').then(function(response) {
            // console.log(response.data);

            //List
            self.list = response.data;

            //set initial id
            self.id = response.data[0]._id;

            //Set initial files
            self.icon = response.data[0].icon;
            self.banner = response.data[0].banner;
            self.promoBanner = response.data[0].promoBanner;

            // fill initial update form
            self.updateSport = response.data[0].sport;
            self.updateType = response.data[0].type;
            self.updateCapacity = response.data[0].capacity;
            self.updateRules = response.data[0].rules;
            self.updateRgba = response.data[0].promoBannerColor;

            //Dates
            //format Date
            var formatedDate = response.data[0].startDate.substring(0, response.data[0].startDate.length - 14);
            self.updatestartDate = formatedDate;

            var formatedDateEnd = response.data[0].endDate.substring(0, response.data[0].endDate.length - 14);
            self.updateEndDate = formatedDateEnd;

            self.updatestartDateName = response.data[0].startDateName;
            self.updateEndDateName = response.data[0].endDateName;

            //load initial teams
            axios.post('/api/tournaments/teams', {
                data: response.data[0]._id
            }).then(function(response) {
                // console.log(response);
                self.teams = response.data;
            })

            //Load initial Games
            axios.post('/api/games/allBy', {
                id: response.data[0]._id
            }).then(function(response) {
                // console.log(response.data);
                self.games = response.data;

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

            //set selected id
            self.id = id;

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

                //Dates
                //format Date
                var formatedDate = response.data[0].startDate.substring(0, response.data[0].startDate.length - 14);
                self.updatestartDate = formatedDate;

                var formatedDateEnd = response.data[0].endDate.substring(0, response.data[0].endDate.length - 14);
                self.updateEndDate = formatedDateEnd;

                self.updatestartDateName = response.data[0].startDateName;
                self.updateEndDateName = response.data[0].endDateName;

                //Set files
                self.icon = response.data[0].icon;
                self.banner = response.data[0].banner;
                self.promoBanner = response.data[0].promoBanner;

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
                    // console.log(response.data);
                    self.games = response.data;
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
            var self = this,
                formData = new FormData(),
                iconInput = document.querySelector('#iconInput'),
                bannerInput = document.querySelector('#bannerInput'),
                promoBannerInput = document.querySelector('#promoBannerInput');

            //text inputs
            formData.append('id', self.id);
            formData.append('sport', self.updateSport);
            formData.append('type', self.updateType);
            formData.append('rules', self.updateRules);
            formData.append('capacity', self.updateCapacity);
            formData.append('promoBannerColor', self.updateRgba);

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
            // for (var value of formData.values()) {
            //     console.log(value);
            // }

            // Send
            axios.post('/api/tournaments/update', formData).then(function(response) {
                // console.log(response.data);
                //Reset list
                self.list = response.data;
                self.list = '';
                self.list = response.data;
            })



        },
        openGame(ref) {
            this.$refs[ref].open();

        },
        addGame(ref) {
            this.$refs[ref].close()
            var self = this,
                bundle = {},
                teameOne = document.querySelector('#teameOne'),
                teamTwo = document.querySelector('#teamTwo');

            bundle.tournament = self.id;
            bundle.teamOne = teameOne.value;
            bundle.teamTwo = teamTwo.value;
            bundle.date = self.addDate;
            bundle.dateString = self.addDate;
            bundle.time = self.addTime;
            bundle.location = self.addLocation;
            bundle.group = self.addGroup;
            bundle.scoreTeamOne = '';
            bundle.scoreTeamTwo = '';

            // console.log(bundle);

            //send
            axios.post('/api/games/insert', {
                data: bundle
            }).then(function(response) {
                // console.log(response);
            })

            //Reload Games
            axios.post('/api/games/allBy', {
                id: self.id
            }).then(function(response) {
                // console.log(response.data);
                self.games = response.data;
                self.games = '';
                self.games = response.data;
            })
        },
        closeGame(ref) {
            this.$refs[ref].close()
        },

        openScore(ref, teamOne, teamTwo, gameId) {
            this.$refs[ref].open();
            // console.log(teamOne, teamTwo);
            var self = this;

            //Set selected teams scores
            self.selectedTeamOne = teamOne;
            self.selectedTeamTwo = teamTwo;
            self.gameId = gameId;

        },
        addScore(ref) {

            var self = this,
                data = {};

            data.id = self.gameId;
            data.TeamOne = self.selectedTeamOne;
            data.TeamTwo = self.selectedTeamTwo;
            data.scoreTeamOne = self.scoreOne;
            data.scoreTeamTwo = self.scoreTwo;

            // console.log(data);

            //send
            axios.post('/api/games/addScore', {
                data: data
            }).then(function(response) {
                // console.log(response);
            })

            //Reload Games
            axios.post('/api/games/allBy', {
                id: self.id
            }).then(function(response) {
                // console.log(response.data);
                self.games = response.data;
                self.games = '';
                self.games = response.data;

                //Close Modal
                self.$refs[ref].close();
            })



        },
        closeScore(ref) {
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
#sportGamesContainer {
    padding: 15px;
    overflow: scroll;
    overflow-x: hidden;
    height: calc(100vh - 92px);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 30px 1fr;
    #sportGamesHeader {
        display: grid;
        grid-template-columns: 4fr 0.5fr;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        padding-top: 5px;
    }
    #gameList {
        overflow: scroll;
        padding-bottom: 30px;
        .gameItem {
            display: grid;
            grid-template-columns: 3fr 1fr 3fr 2fr 2fr;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            margin-top: 30px;
            padding: 10px;
            img {
                width: 60px;
                height: 60px;
                margin: 0 auto;
                display: block;
            }
            .vsGame {
                margin-top: 20px;
            }
        }
    }
}
@media screen and (min-width: 600px) {
    .sportItem {
        height: 60px;
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
        overflow-x: hidden;
    }
    #sportGamesContainer {
        padding-top: 40px;
        overflow: hidden;
        height: calc(100vh - 155px);
        padding-bottom: 0;
        display: grid !important;
        #gameList {
            overflow: scroll;
            overflow-x: hidden;

        }
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
        padding-top: 40px;
    }
    #sportsUpdateContainer {
        display: block !important;
    }
}
</style>
