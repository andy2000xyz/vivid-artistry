// 版本数据
const editionData = [
  {
    id: "vol1",
    titles: {"zh": "暗夜潮涌时", "en": "Lust in Monochrome", "ja": "夜の肌の温度", "ko": "미니멀한 시선"},
    subtitle: {"zh": "VOL1 · 正式版", "en": "VOL1 · Edition", "ja": "VOL1 · 正式版", "ko": "VOL1 · 정식판"}
  },
  {
    id: "vol2",
    titles: {"zh": "暗夜勾勒欲", "en": "Gilded Shadows Vol.2", "ja": "夜の密やかな熱情", "ko": "최소한의 완벽함"},
    subtitle: {"zh": "VOL2 · 正式版", "en": "VOL2 · Edition", "ja": "VOL2 · 正式版", "ko": "VOL2 · 정식판"}
  },
  {
    id: "vol3",
    titles: {"zh": "夜色初绽放", "en": "Gold Veins, Dark Silk", "ja": "夜の肌、燃える影", "ko": "순수한 공간"},
    subtitle: {"zh": "VOL3 · 正式版", "en": "VOL3 · Edition", "ja": "VOL3 · 正式版", "ko": "VOL3 · 정식판"}
  },
  {
    id: "vol4",
    titles: {"zh": "暗夜缠绕香", "en": "Gilded Shadows Vol.4", "ja": "蒼き肌の誘惑", "ko": "비어있는 경계"},
    subtitle: {"zh": "VOL4 · 正式版", "en": "VOL4 · Edition", "ja": "VOL4 · 正式版", "ko": "VOL4 · 정식판"}
  },
];

const langConfig = {
  zh: {label:"中文版",nextLabel:"EN",nextLang:"en"},
  en: {label:"English",nextLabel:"中文",nextLang:"zh"},
  ja: {label:"日本語",nextLabel:"EN",nextLang:"en"},
  ko: {label:"한국어",nextLabel:"EN",nextLang:"en"}
};
