import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        userData: false,
        userDataTeam: '',
        userDataTeamMates: '',
        contentId: '',
        fromID: '',
        inboxSubject: '',
        selectedTournament: '',
        clientORcms: '',
        urlPage: ''

    },
    mutations: {
        set_clientORcms(state, val) {
            state.clientORcms = val
        },
        set(state, val) {
            state.userData = val

        },
        set_userDataTeam(state, val) {
            state.userDataTeam = val

        },
        set_userDataTeamMates(state, val) {
            state.userDataTeamMates = val

        },
        setContentID(state, val) {
            state.contentId = val

        },
        setfromID(state, val) {
            state.fromID = val

        },
        setinboxSubject(state, val) {
            state.inboxSubject = val
        },
        set_selectedTournament(state, val) {
            state.selectedTournament = val
        },
        setUrlPage(state, val) {
            state.urlPage = val
        }

    }
})

export default store
