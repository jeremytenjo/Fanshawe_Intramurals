import Vue from 'vue';

//MASTER Components
Vue.component('master-standings', require('../components/master/standings.vue'));
Vue.component('master-chat', require('../components/master/chat.vue'));
Vue.component('master-account', require('../components/master/account.vue'));
Vue.component('master-inbox', require('../components/master/inbox.vue'));
Vue.component('master-fixtures', require('../components/master/fixtures.vue'));

//Partial Components
Vue.component('my-header', require('../components/partials/Header.vue'));
Vue.component('my-header-cms', require('../components/partials/Header_cms.vue'));
Vue.component('my-addForm', require('../components/partials/addForm.vue'));
Vue.component('my-nav', require('../components/partials/Nav.vue'));
Vue.component('my-nav-cms', require('../components/partials/Nav_cms.vue'));
Vue.component('my-mates', require('../components/partials/matesContainer.vue'));
Vue.component('my-seachBox', require('../components/partials/seachBox.vue'));
Vue.component('my-inboxBox-cms', require('../components/partials/inboxBox_cms.vue'));
Vue.component('my-inboxBox', require('../components/partials/inboxBox.vue'));
Vue.component('my-snackBar-delete', require('../components/partials/snackbars/delete.vue'));
Vue.component('my-snackBar-added', require('../components/partials/snackbars/added.vue'));
Vue.component('my-snackBar-update', require('../components/partials/snackbars/update.vue'));
Vue.component('my-snackBar-send', require('../components/partials/snackbars/send.vue'));
