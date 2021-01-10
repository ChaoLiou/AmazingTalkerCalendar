import { mount } from "@vue/test-utils";
import AtArrowIcon from "@/components/shared/icons/AtArrowIcon.vue";

describe("AtArrowIcon", () => {
  test("Basic", () => {
    const wrapper = mount(AtArrowIcon);
    expect(wrapper.vm).toBeTruthy();
  });

  test("Arrow to Left", () => {
    const wrapper = mount(AtArrowIcon, {
      propsData: {
        toLeft: true,
      },
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.vm.rotateDegree).toBe(180);
  });
});
