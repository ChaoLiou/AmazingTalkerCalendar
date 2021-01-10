import { mount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import AtTimezoneSwitch from "@/components/shared/AtTimezoneSwitch.vue";
import timezones from "@/assets/timezones";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AtTimezoneSwitch", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      "timezone/tzGmt": () => undefined,
      "timezone/list": () => timezones,
      "timezone/tzName": () => "",
    };

    actions = {
      "timezone/updateTzGmt": jest.fn(),
    };

    store = new Vuex.Store({
      namespaced: true,
      actions,
      getters,
    });

    config.mocks.$t = (keyPath) => keyPath;
  });

  test("Basic", async () => {
    const wrapper = mount(AtTimezoneSwitch, {
      store,
      localVue,
    });
    expect(wrapper.vm).toBeTruthy();
    await wrapper.vm.$nextTick();
    const select = wrapper.find("select");
    wrapper.findAll("select > option").at(1).element.selected = true;
    select.trigger("change");
    expect(actions["timezone/updateTzGmt"]).toHaveBeenCalled();
  });
});
