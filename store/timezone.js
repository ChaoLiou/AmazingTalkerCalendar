import timezones from "@/assets/timezones.json";

export const state = () => ({
  tzGmt: undefined,
  list: timezones,
});

export const mutations = {
  updateTzGmt(state, tzGmt) {
    state.tzGmt = tzGmt;
  },
};

export const getters = {
  tzGmt: (state, getters, rootState, rootGetters) => {
    return rootState.timezone.tzGmt !== undefined
      ? rootState.timezone.tzGmt
      : getters.list[17].gmt;
  },
  list: (state, getters, rootState, rootGetters) => {
    return rootState.timezone.list;
  },
  tzName: (state, getters, rootState, rootGetters) => {
    const target = getters.list.find((item) => item.gmt === getters.tzGmt);
    return target ? target.name : "";
  },
};

export const actions = {
  updateTzGmt({ commit }, tzGmt) {
    commit("updateTzGmt", tzGmt);
  },
};
