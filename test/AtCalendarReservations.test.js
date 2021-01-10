import { mount } from "@vue/test-utils";
import AtCalendarReservations from "@/components/AtCalendar/AtCalendarGrid/AtCalendarReservations.vue";

describe("AtCalendarReservations", () => {
  test("Basic", () => {
    const wrapper = mount(AtCalendarReservations);
    expect(wrapper.vm).toBeTruthy();
  });
});
