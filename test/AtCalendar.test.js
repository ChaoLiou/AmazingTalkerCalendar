import { shallowMount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import AtCalendar from "@/components/AtCalendar.vue";
import AtCalendarPagination from "@/components/AtCalendar/AtCalendarPagination.vue";
import AtCalendarGrid from "@/components/AtCalendar/AtCalendarGrid.vue";
import mockSource from "@/assets/mock/at-calendar.json";
import { getDateObj } from "@/assets/js/utils";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AtCalendar", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      "timezone/tzGmt": () => undefined,
      "timezone/tzName": () => "",
    };

    store = new Vuex.Store({
      namespaced: true,
      getters,
    });

    config.mocks.$t = (keyPath) => keyPath;
  });

  test("Basic", () => {
    const wrapper = shallowMount(AtCalendar, {
      components: {
        AtCalendarPagination,
        AtCalendarGrid,
      },
      store,
      localVue,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test("With Source", () => {
    const todayDateObj = getDateObj();
    const todayIsoDate = todayDateObj.toISOString();

    const wrapper = shallowMount(AtCalendar, {
      components: {
        AtCalendarPagination,
        AtCalendarGrid,
      },
      propsData: {
        source: mockSource,
        defaultDate: todayIsoDate,
      },
      store,
      localVue,
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.vm.isoDate).toBe(todayIsoDate);
    wrapper.vm.changeDate(wrapper.vm.goPrevIncrement);
    const todayDateDay = todayDateObj.getDate();
    todayDateObj.setDate(todayDateDay + wrapper.vm.goPrevIncrement);
    expect(wrapper.vm.isoDate).toBe(todayDateObj.toISOString());
  });
});
