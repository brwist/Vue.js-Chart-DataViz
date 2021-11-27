//Global config params

const SET_SNACKBAR = "SET_SNACKBAR";
const SET_POPUPS = "SET_POPUPS";
const PUSH_POPUP = "PUSH_POPUP";

/**
 * Generates pseudo UUID for performance reasons
 */
export function UUID()
{
  return new Date()
    .getTime()
    .toString()
    .concat(performance.now())
    .concat(Math.random())
    .concat(Math.random());
} 

export const moduleGlobal = {
    namespaced: true,
    state: () => ({
        feedbackSnackbar: {
            text: "",
            visible: false,
            color: "orange",
            persistent: false,
        },
        popups: [],

    }),
    mutations: {
        [SET_SNACKBAR](state, feedbackSnackbar) {
            state.feedbackSnackbar = feedbackSnackbar || {
                text: "",
                visible: false,
                color: "orange",
                persistent: false,
            };
        },
        [PUSH_POPUP](state, popup) {
            state.popups.push(popup);
        },
        [SET_POPUPS](state, popups) {
            state.popups = popups;
        },
    },
    actions: {
        //pushSnackbar pushes a snackbar to the UI with the intention
        //of communicating a message to the user.
        //
        //The function takes the following arguments:
        //  text: the text that will be displayed in the snackbar.
        //  color: the color of the snackbar.
        //  persistent(optional): optional specification of whether snackbar
        //      should be persistent, ie. only close when close is clicked.
        //      Default is false and can be set to true.
        pushSnackbar({ commit }, {text, color, persistent = false}) {
            commit(SET_SNACKBAR, {
                text: text,
                visible: true,
                color: color,
                persistent: persistent,
            });
        },
        closeSnackbar({ commit }) {
            commit(SET_SNACKBAR, {
                text: null,
                visible: false,
                color: null,
                persistent: false,
            });
        },

        //POPUPS

        //pushPopup takes a config object, defined
        pushPopup({ commit }, popupConfig ){
            let popup = {
                id: UUID(), // crypto.randomUUID(),
                ...popupConfig
                //Should I include something about the selected state?
            };

            commit(PUSH_POPUP, popup);
        },
        closePopup({ commit, state }, popupID){
            let filteredPopups = state.popups.filter((d) => d.id !== popupID);

            commit(SET_POPUPS, filteredPopups);
        }

    },
};
