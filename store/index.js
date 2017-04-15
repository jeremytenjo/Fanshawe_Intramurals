import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        userData: false,
        userDataTeam: '',
        userDataTeamMates: '',
        contentId: '',
        fromID: '',
        inboxSubject: '',
        urlPage: ''
    },
    mutations: {
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
        setUrlPage(state, val) {
            state.urlPage = val
        }

    }
})

export default store
