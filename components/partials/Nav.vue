<template lang="html">
<nav id="navContainer">

<router-link to="/fixtures">
<div id="nav_fixturesContainer">
<div class="nav_iconContainer">
<img src="~assets/img/fixturesIcon.svg" alt="Fixtures Icon">
<p>Fixtures</p>
</div>
</div>
</router-link>

<router-link to="/standings">
<div id="nav_standingsContainer">
  <div class="nav_iconContainer">
  <img src="~assets/img/standingsIcon.svg" alt="Standings Icon">
  <p>Standings</p>
  </div>
</div>
</router-link>

<router-link to="/chat">
<div id="nav_chatContainer">
  <div class="nav_iconContainer">
  <img src="~assets/img/chatIcon.svg" alt="Fixtures Icon">
  <p>Chat</p>
  </div>
</div>
</router-link>

<router-link to="/inbox">
<div id="nav_inboxContainer">
  <div class="nav_iconContainer">
  <img src="~assets/img/inboxIcon.svg" alt="Fixtures Icon">
  <p>Inbox</p>
  </div>
</div>
</router-link>

<router-link to="/account">
<div id="nav_accountContainer">
  <div class="nav_iconContainer">
  <img src="~assets/img/accountIcon.svg" alt="Fixtures Icon">
  <p>Account</p>
  </div>
</div>
</router-link>

</nav>
</template>

<script>
export default {
    mounted() {
        var pageTitle = document.querySelector('#pageTitle'),
         backDrop = document.querySelector('#backDrop'),
         backIcon = document.querySelector('#backIcon'),
         nav_fixturesContainer = document.querySelector('#nav_fixturesContainer'),
         nav_standingsContainer = document.querySelector('#nav_standingsContainer'),
         nav_chatContainer = document.querySelector('#nav_chatContainer'),
         nav_inboxContainer = document.querySelector('#nav_inboxContainer'),
         nav_accountContainer = document.querySelector('#nav_accountContainer');
        nav_fixturesContainer.addEventListener('click', function() {
            pageTitle.innerHTML = 'Fixtures';
            backDrop.style.height = '110px';
            backIcon.style.display = 'none';

        })
        nav_standingsContainer.addEventListener('click', function() {
            pageTitle.innerHTML = 'Standings';
            backIcon.style.display = 'none';
        })
        nav_chatContainer.addEventListener('click', function() {
            pageTitle.innerHTML = 'Chat';
            backIcon.style.display = 'none';
        })
        nav_inboxContainer.addEventListener('click', function() {
            pageTitle.innerHTML = 'Inbox';
            backIcon.style.display = 'none';
        })
        nav_accountContainer.addEventListener('click', function() {
            pageTitle.innerHTML = 'Account';
            backIcon.style.display = 'none';
        })
    }
}
</script>

<style lang="scss" scoped>
.nav_iconContainer {
    // background: black;
    // width: 100%;
    height: 42px;
    margin: 0 auto;
    img {
        width: 15px;
        margin: 0 auto;
        display: block;
        padding-top: 7px;

    }
    p {
        color: white;
        display: block;
        font-size: 10px;
        text-align: center;
        position: relative;
        bottom: 20px;
    }
}
#navContainer {
    height: 42px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: red;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}

#nav_fixturesContainer {
    // background: green;
}
#nav_standingsContainer {
    // background: yellow;
    img {
        width: 20px;
        padding-top: 5px;
    }
    p {
        bottom: 22.5px;
    }
}
#nav_chatContainer {
    // background: pink;
}
#nav_inboxContainer {
    // background: purple;
}
#nav_accountContainer {
    // background: blue;
}
@media only screen and (min-width: 600px) {
    #navContainer {
        display: none;
    }
}
</style>
