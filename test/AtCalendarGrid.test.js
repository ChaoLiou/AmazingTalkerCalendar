import { shallowMount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import AtCalendarGrid from "@/components/AtCalendar/AtCalendarGrid.vue";
import AtCalendarGridItem from "@/components/AtCalendar/AtCalendarGrid/AtCalendarGridItem";
import AtCalendarReservations from "@/components/AtCalendar/AtCalendarGrid/AtCalendarReservations";
import mockSource from "@/assets/mock/at-calendar-grid.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AtCalendarGrid", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      "timezone/tzGmt": () => 0,
    };

    store = new Vuex.Store({
      namespaced: true,
      getters,
    });
  });

  test("Basic", () => {
    const wrapper = shallowMount(AtCalendarGrid, {
      components: {
        AtCalendarGridItem,
        AtCalendarReservations,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test("With Source", () => {
    const wrapper = shallowMount(AtCalendarGrid, {
      components: {
        AtCalendarGridItem,
        AtCalendarReservations,
      },
      propsData: {
        source: mockSource,
      },
      store,
      localVue,
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
