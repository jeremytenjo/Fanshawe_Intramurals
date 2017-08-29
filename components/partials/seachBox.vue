<template >
<div>
    <img src="~assets/img/searchIcon.png" id="searchIcon" ref="searchIcon" alt="search icon" @click="searchOpen" />
    <div id="searchBox">
        <input type="text" name="searchInput" placeholder="Search..." id="searchInput" v-model="char" @keyup="resultsOpen">
        <img src="~assets/img/closeIcon.png" alt="close icon" id="closeIcon" @click="closeResults" />
    </div>

    <div id="resultList">
        <img src="~assets/img/triangle.svg" alt="search icon" class="navTriangleSearch" />

        <p id="noReultsWarn">No Results Found</p>
        <div id="resultCon">

            <div id="userResults" class="resultContainer" v-if="dataUsers != ''">
                <div>
                    <p class="resultsTitles">Users:</p>
                    <div class="resultBox" v-for="user in dataUsers">
                        <p class="resultTitle" @click="resultClick">{{ user.fname }} {{ user.lname }}</p>
                        <img :src="'userPhotos/' + user.photo" alt="user icon" class="resultImg" />
                    </div>
                </div>
            </div>

            <div id="teamsResults" class="resultContainer" v-if="dataTeams != ''">
                <div>
                    <p class="resultsTitles">Teams:</p>
                    <div class="resultBox" v-for="team in dataTeams">
                        <p class="resultTitle" @click="resultClick">{{ team.name }}</p>
                        <img :src="'teamLogos/' + team.file" alt="user icon" class="resultImg" />
                    </div>
                </div>
            </div>

            <div id="tournamentsResults" class="resultContainer" v-if="dataTournaments != ''">
                <div>
                    <p class="resultsTitles">Tournaments:</p>
                    <div class="resultBox" v-for="item in dataTournaments">
                        <p class="resultTitle" @click="resultClick">{{ item.sport }}</p>
                        <img :src="'tournamentIcons/' + item.icon" alt="user icon" class="resultImg" />
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

var toggle = true;

export default {

    mounted() {

        var searchIcon = document.querySelector('#searchIcon'),
            searchInput = document.querySelector('#searchIcon'),
            resultList = document.querySelector('#resultList'),
            closeIcon = document.querySelector('#closeIcon'),
            inboxBox = document.querySelector('#inboxBox'),
            addIcon = document.querySelector('#addIcon'),
            resultCon = document.querySelector('#resultCon'),
            teamsResults = document.querySelector('#resultCon'),
            resultBox = document.querySelector('#resultCon'),
            tournamentsResults = document.querySelector('#resultCon'),
            noReultsWarn = document.querySelector('#noReultsWarn'),
            dataUsers,
            dataTeams,
            dataTournaments,
            mq,
            value,
            self = this;


        if (matchMedia) {
            mq = window.matchMedia("(max-width: 600px)");
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        function WidthChange(mq) {
            if (mq.matches) {
                resultList.style.display = 'none';
                closeIcon.style.display = 'none';
                inboxBox.style.display = 'none';
                addIcon.style.opacity = 1;
            }

        }


    },
    data() {
        return {
            dataTeams: '',
            dataUsers: [],
            dataTournaments: '',
            char: ''
        }
    },
    methods: {
        searchOpen() {
            var searchIcon = document.querySelector('#searchIcon'),
                searchInput = document.querySelector('#searchIcon'),
                resultList = document.querySelector('#resultList'),
                closeIcon = document.querySelector('#closeIcon'),
                inboxBox = document.querySelector('#inboxBox'),
                addIcon = document.querySelector('#addIcon'),
                resultCon = document.querySelector('#resultCon'),
                teamsResults = document.querySelector('#resultCon'),
                resultBox = document.querySelector('#resultCon'),
                tournamentsResults = document.querySelector('#resultCon'),
                noReultsWarn = document.querySelector('#noReultsWarn'),
                dataUsers,
                dataTeams,
                dataTournaments,
                mq,
                value,
                self = this;
            if (toggle === true) {
                if (window.matchMedia("(max-width: 400px)")) {
                    var pageTitle = document.querySelector('#pageTitle');
                    pageTitle.style.display = 'none';
                }

                TweenMax.to("#searchBox", .4, {
                    backgroundColor: "rgba(0, 0, 6, 0.4)",
                    left: 'auto',
                    right: '-50%',
                    x: '-50%',
                    ease: Power2.easeInOut
                });
                TweenMax.to("#pageTitle", .5, {
                    left: '82px'
                });
                this.$refs.searchIcon.src = require('~/assets/img/closeIcon.png');

                searchIcon.style.top = '13px';
                toggle = false;


            } else {
                if (window.matchMedia("(min-width: 400px)")) {
                    var pageTitle = document.querySelector('#pageTitle');
                    pageTitle.style.display = 'block';
                }
                this.$refs.searchIcon.src = require('~/assets/img/searchIcon.png');
                searchInput.value = '';

                TweenMax.to("#searchBox", .1, {
                    right: '-1000px',
                    x: 'auto',
                    ease: Power2.easeInOut
                });

                pageTitle.style.left = '50%';
                searchIcon.style.top = '10px';
                resultList.style.display = 'none';
                toggle = true;

            }
        },
        resultsOpen() {
            var searchIcon = document.querySelector('#searchIcon'),
                searchInput = document.querySelector('#searchIcon'),
                resultList = document.querySelector('#resultList'),
                closeIcon = document.querySelector('#closeIcon'),
                inboxBox = document.querySelector('#inboxBox'),
                addIcon = document.querySelector('#addIcon'),
                resultCon = document.querySelector('#resultCon'),
                teamsResults = document.querySelector('#resultCon'),
                userResults = document.querySelector('#userResults'),
                resultBox = document.querySelector('#resultCon'),
                tournamentsResults = document.querySelector('#resultCon'),
                noReultsWarn = document.querySelector('#noReultsWarn'),
                dataUsers,
                dataTeams,
                dataTournaments,
                mq,
                value,
                self = this;

            // console.log(this.dataTeams);
            // this.dataTeams = 'true';
            // console.log(this.dataTeams);

            resultList.style.display = 'block';
            var w = window.innerWidth;
            if (w >= 600) {
                closeIcon.style.display = 'inline';
            }

            //get value
            // value = searchInput.value;
            value = self.char;
            // console.log(self.char);
            if (value != '') {
                // console.log(value);
                axios.post('/api/search/find', {
                    value
                }).then(function(response) {
                    var dataUsers,
                        dataTeams,
                        dataTournaments;
                    console.log(response.data);

                    dataUsers = response.data.users;
                    dataTeams = response.data.teams;
                    dataTournaments = response.data.tournaments;

                    self.dataUsers = response.data.users;
                    self.dataTeams = response.data.teams;
                    self.dataTournaments = response.data.tournaments;


                    // console.log(dataUsers.length, dataTeams.length, dataTournaments.length);

                    //if not results
                    if (dataUsers.length === 0 && dataTeams.length === 0 && dataTournaments.length === 0) {
                        userResults.style.display = 'none';
                        teamsResults.style.display = 'none';
                        tournamentsResults.style.display = 'none';
                        noReultsWarn.style.display = 'block';

                    }

                })

            }

        },
        resultClick() {
            console.log("HERE!");
        },
        closeResults() {
            var searchIcon = document.querySelector('#searchIcon'),
                searchInput = document.querySelector('#searchIcon'),
                resultList = document.querySelector('#resultList'),
                closeIcon = document.querySelector('#closeIcon'),
                inboxBox = document.querySelector('#inboxBox'),
                addIcon = document.querySelector('#addIcon'),
                resultCon = document.querySelector('#resultCon'),
                teamsResults = document.querySelector('#resultCon'),
                resultBox = document.querySelector('#resultCon'),
                tournamentsResults = document.querySelector('#resultCon'),
                noReultsWarn = document.querySelector('#noReultsWarn'),
                dataUsers,
                dataTeams,
                dataTournaments,
                mq,
                value,
                self = this;

            searchInput.value = '';
            resultList.style.display = 'none';
            closeIcon.style.display = 'none';
        }

    }
}
</script>

<style >
#searchBox {
    width: 90%;
    height: 40px;
    position: fixed;
    border-radius: 2px;
    top: 1px;
    right: -579px;
    background: transparent;
    color: white;
    font-family: roboto;
    padding-left: 20px;
}

#searchInput {
    /*transform: translateY(10px);*/
    width: 260px;
    border-bottom: transparent;
    border-color: transparent;
}

#searchIcon {
    width: 25px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 1;
}

#closeIcon {
    transform: translateY(2px);
    width: 25px;
    display: none;
    cursor: pointer;
}

@media (min-width: 600px) {
    #searchBox {
        width: 330px;
        left: 50% !important;
        transform: translateX(-50%);
        background: black;
        right: auto;
        top: 12px;
        background: rgba(0, 0, 6, 0.4) url(~assets/img/searchIcon.png) no-repeat scroll 7px 7px;
        background-size: 25px;
        padding-left: 40px;
        color: white;
        position: absolute;
    }
    #searchIcon {
        display: none;
    }
}

#resultList {
    width: 100%;
    height: auto;
    background-color: white;
    position: fixed;
    top: 42px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
    z-index: 2;
    border-radius: 2px;
    display: none;
}

.navTriangleSearch {
    position: absolute;
    z-index: 2;
    width: 20px;
    top: -19px;
    left: 152px;
    display: none;
}

.resultContainer {
    width: 90%;
    margin: 0 auto;
}

#noReultsWarn {
    margin-left: 18px;
    margin-top: 16px;
    display: none;
}

.list__tile__content {
    flex: 0 1 100%;
}

.resultsTitles {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #009587;
}

.resultBox {
    margin-top: 10px;
    margin-bottom: -20px;
    height: 80px;
}

.resultTitle {
    font-family: Roboto, san-serif;
    font-size: 18px;
    float: left;
    margin-left: 20px;
    cursor: pointer;
}

.resultImg {
    width: 40px;
    float: right;
    margin-right: 20px;
    cursor: pointer;
}

@media (min-width: 600px) {
    .resultTitle {
        position: relative;
        top: 15px;
        left: 0;
        font-family: Roboto, san-serif;
        font-size: 18px;
        float: none;
    }
    .resultImg {
        width: 40px;
        position: relative;
        left: 265px;
        bottom: 34px;
        float: none;
    }
    .resultContainer {
        width: inherit;
        margin: none;
    }
    #resultList {
        width: 330px;
        top: 80px;
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .navTriangleSearch {
        display: block;
    }
}
</style>
