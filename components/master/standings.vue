<template lang="html">
  <div id="standingsContainer">
		<div id="qualifyingContainer">
      <h2>Currently Qualifying</h2>
      <div id="groupTitles">
        <div>GROUP 1</div>
        <div>GROUP 2</div>
        <div>GROUP 3</div>
        <div>GROUP 4</div>
      </div>
      <div id="QinnerCon">
        <div id="group1A">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group1A_Img">
          <p id="group1A_P">Loading</p>
        </div>
        <div id="group2A">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group2A_Img">
          <p id="group2A_P">Loading</p>
        </div>
        <div id="group3A">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group3A_Img">
          <p id="group3A_P">Loading</p>
        </div>
        <div id="group4A">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group4A_Img">
          <p id="group4A_P">Loading</p>
        </div>
        <div id="group1B">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group1B_Img">
          <p id="group1B_P">Loading</p>
        </div>
        <div id="group2B">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group2B_Img">
          <p id="group2B_P">Loading</p>
        </div>
        <div id="group3B">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group3B_Img">
          <p id="group3B_P">Loading</p>
        </div>
        <div id="group4B">
          <img src="~assets/img/default_team_logo.png" alt="Qualifieng Team logo" id="group4B_Img">
          <p id="group4B_P">Loading</p>
        </div>
      </div>
		</div>

    <div id="groupsContainer">

<div id="selectContainer">
      <select id="selectionContainer">
        <option value="group1" >GROUP 1</option>
        <option value="group2" >GROUP 2</option>
        <option value="group3" >GROUP 3</option>
        <option value="group4" >GROUP 4</option>
      </select>
      <img src="~assets/img/triangle.png" alt="Qualifieng Team logo" id="triangleAgain">
    </div>

      <div id="groupTitlesAll">
        <div>Rank</div>
        <div>Name</div>
        <div>Wins</div>
        <div>Loses</div>
        <div>Ties</div>
        <div>Points</div>
      </div>

      <div id="groupTeams">

        <div class="teamStats" v-for="(result, index) in groupInfo">
          <div>{{index + 1}}</div>
          <div><p>{{ result.name}}</p></div>
          <div>{{ result.wins}}</div>
          <div>{{ result.loses}}</div>
          <div>{{ result.ties}}</div>
          <div>{{ result.points}}</div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from '~plugins/axios';

export default {
    data() {
        return {
            groupInfo: ''
        }
    },
    mounted() {
        var self = this,
            groupInfo,
            selectionContainer = document.querySelector('#selectionContainer'),
            group1A_Img = document.querySelector('#group1A_Img'),
            group2A_Img = document.querySelector('#group2A_Img'),
            group3A_Img = document.querySelector('#group3A_Img'),
            group4A_Img = document.querySelector('#group4A_Img'),
            group1B_Img = document.querySelector('#group1B_Img'),
            group2B_Img = document.querySelector('#group2B_Img'),
            group3B_Img = document.querySelector('#group3B_Img'),
            group4B_Img = document.querySelector('#group4B_Img'),
            group1A_P = document.querySelector('#group1A_P'),
            group2A_P = document.querySelector('#group2A_P'),
            group3A_P = document.querySelector('#group3A_P'),
            group4A_P = document.querySelector('#group4A_P'),
            group1B_P = document.querySelector('#group1B_P'),
            group2B_P = document.querySelector('#group2B_P'),
            group3B_P = document.querySelector('#group3B_P'),
            group4B_P = document.querySelector('#group4B_P');

        //Load Currently Qualifying
        // console.log(this.$store.state.userDataTeam[0].sport[0]);
        axios.post('/api/teams/currentlyQualifying', {
            'id': this.$store.state.userDataTeam[0].sport[0]
        }).then(function(response) {
            // console.log(response.data.groupOne[1].file);

            //Set Group 1
            group1A_Img.src = 'teamLogos/' + response.data.groupOne[0].file;
            group1B_Img.src = 'teamLogos/' + response.data.groupOne[1].file;
            group1A_P.innerHTML = response.data.groupOne[0].name;
            group1B_P.innerHTML = response.data.groupOne[1].name;

            //Set Group 2
            group2A_Img.src = 'teamLogos/' + response.data.groupTwo[0].file;
            group2B_Img.src = 'teamLogos/' + response.data.groupTwo[1].file;
            group2A_P.innerHTML = response.data.groupTwo[0].name;
            group2B_P.innerHTML = response.data.groupTwo[1].name;

            //Set Group 3
            group3A_Img.src = 'teamLogos/' + response.data.groupThree[0].file;
            group3B_Img.src = 'teamLogos/' + response.data.groupThree[1].file;
            group3A_P.innerHTML = response.data.groupThree[0].name;
            group3B_P.innerHTML = response.data.groupThree[1].name;

            //Set Group 4
            group4A_Img.src = 'teamLogos/' + response.data.groupFour[0].file;
            group4B_Img.src = 'teamLogos/' + response.data.groupFour[1].file;
            group4A_P.innerHTML = response.data.groupFour[0].name;
            group4B_P.innerHTML = response.data.groupFour[1].name;
        })

        //Load Group Statistics
        axios.post('/api/teams/groups', {
            'id': this.$store.state.userDataTeam[0].sport[0]
        }).then(function(response) {
            // console.log(response.data.groupOne);
            self.groupInfo = response.data.groupOne;
            groupInfo = response.data;
        })


        selectionContainer.onchange = function(e) {
            // console.log(this.value)
            if (this.value === 'group1') {
                self.groupInfo = groupInfo.groupOne;
            } else if (this.value === 'group2') {
                self.groupInfo = groupInfo.groupTwo;

            } else if (this.value === 'group3') {
                self.groupInfo = groupInfo.groupThree;

            } else if (this.value === 'group4') {
                self.groupInfo = groupInfo.groupFour;
            }


        };

    },
    methods: {

    }

}
</script>

<style lang="scss">

#standingsContainer {
  margin-top: 50px;
}
.teamStats {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    width: 100%;
    margin-top: 20px;
    p {
        width: 35px;
        text-align: left;
    }
}

#groupsContainer {
    background-color: white;
    width: 90%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 0 auto;
    display: block;
    margin-top: 30px;
    border-radius: 2px;
    height: auto;
    padding-bottom: 20px;
    #selectionContainer {
        width: 100%;
        text-align-last: center;
    }
}

#QinnerCon {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    grid-column-gap: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    border-radius: 2px;
    p {
        font-size: 12px;
    }
    img {
        width: 40px;
    }
}
#groupTitles {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;

}
#qualifyingContainer {
    background-color: white;
    width: 90%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 0 auto;
    display: block;
    h2 {
        text-align: center;
        color: grey;
        font-size: 14px;
        padding-top: 10px;
    }

}
#groupTitlesAll {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    width: 100%;
    margin-top: 5px;

}
#groupTeams {
    margin-top: 10px;
}

#selectContainer {
    width: 88px;
    display: block;
    margin: 0 auto;
}
#selectionContainer {
  width: 80px !important;
  float: left;
}
#triangleAgain {
    width: 8px;
    float: left;
    margin-top: 17px;
}
@media (min-width: 600px) {
    #qualifyingContainer {
        width: 100%;
        box-shadow: none;
        h2 {
            margin-top: 0;
        }
    }
    #groupsContainer {
        width: 100%;
        box-shadow: none;
        h2 {
            margin-top: 0;
        }
    }
    #standingsContainer {
      margin-top: 10px;
    }

}
</style>
