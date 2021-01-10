import zhTw from "./zh-tw.json";
import enUs from "./en-us.json";
import zhCn from "./zh-cn.json";

export default {
  locales: ["zh-tw", "en-us", "zh-cn"],
  defaultLocale: "zh-tw",
  vueI18n: {
    fallbackLocale: "zh-tw",
    messages: {
      "zh-tw": zhTw,
      "zh-cn": zhCn,
      "en-us": enUs,
    },
  },
};
