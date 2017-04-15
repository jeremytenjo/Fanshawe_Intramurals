<template lang="html">
  <div id="fixturesContainer">
		<div id="fixturesOptions">
<div>
  <h2 id="upcomingOption" @click="showUpcoming">Upcoming</h2>
</div>
<div>
  <h2 id="resultsOption" @click="showResults">Results</h2>
</div>
		</div>

    <div id="upcomingContainer">

<div class="upcomingList" v-for="result in upcomingResults">
<div>
  <img :src="'/teamLogos/' + result.teamOne[0].file" alt="Team Logo" class="teamLogo_upcoming"/>
  <p>{{result.teamOne[0].name}}</p>

</div>
<div>

  <p class="vs">vs</p>
</div>
<div>
  <img :src="'/teamLogos/' + result.teamTwo[0].file" alt="Team Logo" class="teamLogo_upcoming"/>
  <p>{{result.teamTwo[0].name}}</p>

</div>
<div>
  <ul>
    <li>{{result.dateString}}</li>
    <li>{{result.location}}</li>
    <li>{{result.stage}}</li>
  </ul>

</div>

</div>




    </div>

    <div id="resultsContainer">
      <div class="resultList" v-for="result in pastResults">
        <div>
          <img :src="'/teamLogos/' + result.teamOne[0].file" alt="Team Logo" class="teamLogo_upcoming"/>
          <p>{{result.teamOne[0].name}}</p>
        </div>
        <div>
          <p class="resultScore">{{result.scoreTeamOne}} - {{result.scoreTeamTwo}}</p>
        </div>
      <div>
        <img :src="'/teamLogos/' + result.teamTwo[0].file" alt="Team Logo" class="teamLogo_upcoming"/>
        <p>{{result.teamTwo[0].name}}</p>

      </div>
      <div>
      <ul>
        <li>{{result.dateString}}</li>
        <li>{{result.location}}</li>
        <li>{{result.stage}}</li>
      </ul>
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
            upcomingResults: '',
            pastResults: ''
        }
    },
    mounted() {
        var upcomingContainer = document.querySelector('#upcomingContainer'),
            resultsContainer = document.querySelector('#resultsContainer'),
            upcomingOption = document.querySelector('#upcomingOption'),
            resultsOption = document.querySelector('#resultsOption'),
            userData = this.$store.state.userData,
            self = this,
            wwidth = window.innerWidth;

        //GET User upcomingResults Data
        axios.post('/api/games/fixtures', {
            userData: userData
        }).then(function(upcomingResults) {
            // console.log(upcomingResults.data[0].teamOne[0].file);
            // console.log(upcomingResults.data[0].teamTwo[0].file);
            self.upcomingResults = upcomingResults.data;
        })

        //GET User pastResults Data
        axios.post('/api/games/results', {
            userData: userData
        }).then(function(pastResults) {
            // console.log(pastResults.data[0].teamOne[0]);
            // console.log(pastResults.data[0].teamTwo[0]);
            self.pastResults = pastResults.data;
        })

    },
    methods: {
        showUpcoming() {
            var w = window.innerWidth;
            if (w > 600) {
                upcomingOption.style.color = '#212121';
            } else {
                upcomingOption.style.color = 'white';
            }
            resultsOption.style.color = 'lightgrey';
            upcomingContainer.style.display = 'block';
            resultsContainer.style.display = 'none';
        },
        showResults() {
            var w = window.innerWidth;
            if (w > 600) {
                resultsOption.style.color = '#212121';
            } else {
                resultsOption.style.color = 'white';
            }
            upcomingOption.style.color = 'lightgrey';
            upcomingContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
        }

    }
}
</script>

<style lang="scss">
.vs {
    margin-top: 50px;
}
.upcomingList {
    display: grid;
    grid-template-columns: 1fr 0.5fr 1fr 2fr;
    position: relative;
    height: auto;
    width: 90%;
    background: white;
    border-radius: 2px;
    margin: 0 auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin-bottom: 20px;
    img {
        width: 70px;
        display: block;
        margin: 0 auto;
    }
    ul {
        margin-top: 10px;
    }
    li {
        text-align: center;
    }
    .RSVPCon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

    }
    p {
        text-align: center;
        font-size: 12px;
        margin-bottom: 0;
    }
}
.resultList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    width: 90%;
    background: white;
    margin: 0 auto 20px;
    height: auto;
    border-radius: 2px;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    img {
        width: 70px;
        margin-top: 10px;
    }
    ul {
        margin-top: 20px;

    }
    li {
        text-align: center;
    }
    p {
      margin-bottom: 0;

    }
    .resultLetter {
        color: red;
        font-size: 50px;
        padding-top: 15px;
        height: auto;
    }
    .resultScore {
        font-size: 30px;
        padding-top: 30px;
        height: auto;
    }
}
#fixturesOptions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: fixed;
    width: 100%;
    top: 35px;
    z-index: 1;
    background-color: red;
    h2 {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
    }
    #upcomingOption {
        color: white;
    }
    #resultsOption {
        color: lightgrey;
    }
}

#upcomingContainer {
    // background: green;
    width: 100%;
    height: 400px;
    display: block;
    margin-top: 90px;

}
#resultsContainer {
    // background: yellow;
    width: 100%;
    height: 400px;
    display: none;
    margin-top: 90px;

}
@media (min-width: 600px) {
    #fixturesOptions {
        position: inherit;
        background-color: white;
        h2 {
            margin-top: 10px;
        }
        #upcomingOption {
            color: #212121;
        }
    }
    #upcomingContainer {
        margin-top: 0;
    }
    #resultsContainer {
        margin-top: 0;
    }

}
</style>
