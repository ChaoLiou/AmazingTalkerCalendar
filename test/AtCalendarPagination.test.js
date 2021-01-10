import { mount } from "@vue/test-utils";
import AtCalendarPagination from "@/components/AtCalendar/AtCalendarPagination.vue";
import AtArrowIcon from "@/components/shared/icons/AtArrowIcon.vue";

describe("AtCalendarPagination", () => {
  test("fomDate is Today", () => {
    const wrapper = mount(AtCalendarPagination, {
      components: {
        AtArrowIcon,
      },
    });
    expect(wrapper.vm).toBeTruthy();
    const ctrlNextItem = wrapper.find(".controls-group__item_next");
    ctrlNextItem.trigger("click");
    ctrlNextItem.trigger("mouseenter");
    expect(wrapper.vm.ctrlNextHovered).toBeTruthy();
    expect(wrapper.vm.nextArrowIconColor).toBe(wrapper.vm.highlightColor);
    ctrlNextItem.trigger("mouseleave");
    expect(wrapper.vm.ctrlNextHovered).toBeFalsy();
    expect(wrapper.vm.nextArrowIconColor).toBeUndefined();

    const ctrlPrevItem = wrapper.find(".controls-group__item_prev");
    ctrlPrevItem.trigger("click");
    ctrlPrevItem.trigger("mouseenter");
    expect(wrapper.vm.ctrlPrevHovered).toBeTruthy();
    expect(wrapper.vm.prevArrowIconColor).toBe(wrapper.vm.disabledColor);
    ctrlPrevItem.trigger("mouseleave");
    expect(wrapper.vm.ctrlPrevHovered).toBeFalsy();
    expect(wrapper.vm.prevArrowIconColor).toBe(wrapper.vm.disabledColor);
  });

  test("fomDate is Next Week", () => {
    const dateObj = new Date();
    const dateDay = dateObj.getDate();
    dateObj.setDate(dateDay + 7);

    const wrapper = mount(AtCalendarPagination, {
      propsData: {
        fromDate: dateObj.toISOString(),
      },
      components: {
        AtArrowIcon,
      },
    });
    expect(wrapper.vm).toBeTruthy();
    const ctrlPrevItem = wrapper.find(".controls-group__item_prev");
    ctrlPrevItem.trigger("click");
    ctrlPrevItem.trigger("mouseenter");
    expect(wrapper.vm.ctrlPrevHovered).toBeTruthy();
    expect(wrapper.vm.prevArrowIconColor).toBe(wrapper.vm.highlightColor);
    ctrlPrevItem.trigger("mouseleave");
    expect(wrapper.vm.ctrlPrevHovered).toBeFalsy();
    expect(wrapper.vm.prevArrowIconColor).toBeUndefined();
  });
});
