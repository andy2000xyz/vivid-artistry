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
  {
    id: "vol5",
    titles: {"zh": "暗夜裹着蜜糖 · 编辑精选", "en": "Gilded Nightfall · Editorial Collection", "ja": "夜の体温 · 編集コレクション", "ko": "침묵의 선 · 편집 컬렉션"},
    subtitle: {"zh": "VOL5 · 正式版", "en": "VOL5 · Edition", "ja": "VOL5 · 正式版", "ko": "VOL5 · 정식판"}
  },
  {
    id: "vol6",
    titles: {"zh": "夜挑情弦 · 编辑精选", "en": "Gilded Depths Vol.6 · Editorial Collection", "ja": "夜の香水 · 編集コレクション", "ko": "미니멀한 균형 · 편집 컬렉션"},
    subtitle: {"zh": "VOL6 · 正式版", "en": "VOL6 · Edition", "ja": "VOL6 · 正式版", "ko": "VOL6 · 정식판"}
  },
  {
    id: "vol7",
    titles: {"zh": "暗夜蜜语潮 · 编辑精选", "en": "Golden Shadows Noir · Editorial Collection", "ja": "夜の熱帯魚 · 編集コレクション", "ko": "흐르는 실루엣 · 편집 컬렉션"},
    subtitle: {"zh": "VOL7 · 正式版", "en": "VOL7 · Edition", "ja": "VOL7 · 正式版", "ko": "VOL7 · 정식판"}
  },
  {
    id: "vol8",
    titles: {"zh": "夜色暗涌时 · 编辑精选", "en": "Gilded Shadows Volume · Editorial Collection", "ja": "濡れた旋律 · 編集コレクション", "ko": "빈 공간의 미학 · 편집 컬렉션"},
    subtitle: {"zh": "VOL8 · 正式版", "en": "VOL8 · Edition", "ja": "VOL8 · 正式版", "ko": "VOL8 · 정식판"}
  },
  {
    id: "vol9",
    titles: {"zh": "午夜绽放 · 编辑精选", "en": "Gilded Midnight Muse · Editorial Collection", "ja": "夜の吐息、肌の記憶 · 編集コレクション", "ko": "무결의 미학 · 편집 컬렉션"},
    subtitle: {"zh": "VOL9 · 正式版", "en": "VOL9 · Edition", "ja": "VOL9 · 正式版", "ko": "VOL9 · 정식판"}
  },
  {
    id: "vol10",
    titles: {"zh": "暗夜蜜桃 · 编辑精选", "en": "Vol10: Gilded Shadows · Editorial Collection", "ja": "夜の囁き、肌の熱 · 編集コレクション", "ko": "디지털 순수함 · 편집 컬렉션"},
    subtitle: {"zh": "VOL10 · 正式版", "en": "VOL10 · Edition", "ja": "VOL10 · 正式版", "ko": "VOL10 · 정식판"}
  },
  {
    id: "vol11",
    titles: {"zh": "夜缠呼吸 · 编辑精选", "en": "Gilded Midnight Visions · Editorial Collection", "ja": "夜の感触の余韻 · 編集コレクション", "ko": "선의 침묵 · 편집 컬렉션"},
    subtitle: {"zh": "VOL11 · 正式版", "en": "VOL11 · Edition", "ja": "VOL11 · 正式版", "ko": "VOL11 · 정식판"}
  },
  {
    id: "vol12",
    titles: {"zh": "夜火灼吻痕 · 编辑精选", "en": "Gilded Midnight Reverie · Editorial Collection", "ja": "夜の誘い · 編集コレクション", "ko": "순백의 침묵 · 편집 컬렉션"},
    subtitle: {"zh": "VOL12 · 正式版", "en": "VOL12 · Edition", "ja": "VOL12 · 正式版", "ko": "VOL12 · 정식판"}
  },
  {
    id: "vol13",
    titles: {"zh": "夜色的私语 · 编辑精选", "en": "Gilded Shadows of Desire · Editorial Collection", "ja": "夜の秘密、肌に触れる · 編集コレクション", "ko": "균형의 미학 · 편집 컬렉션"},
    subtitle: {"zh": "VOL13 · 正式版", "en": "VOL13 · Edition", "ja": "VOL13 · 正式版", "ko": "VOL13 · 정식판"}
  },
  {
    id: "vol14",
    titles: {"zh": "暗夜灼烧 · 编辑精选", "en": "Gilded Shadows Vol.14 · Editorial Collection", "ja": "夜の秘密を抱く · 編集コレクション", "ko": "순수한 선 · 편집 컬렉션"},
    subtitle: {"zh": "VOL14 · 正式版", "en": "VOL14 · Edition", "ja": "VOL14 · 正式版", "ko": "VOL14 · 정식판"}
  },
  {
    id: "vol15",
    titles: {"zh": "暗夜蜜语 · 编辑精选", "en": "Vol. 15: Gilded Shadows · Editorial Collection", "ja": "夜の肌の秘密 · 編集コレクション", "ko": "순백의 고요 · 편집 컬렉션"},
    subtitle: {"zh": "VOL15 · 正式版", "en": "VOL15 · Edition", "ja": "VOL15 · 正式版", "ko": "VOL15 · 정식판"}
  },
  {
    id: "vol16",
    titles: {"zh": "燥热午后的喘息 · 编辑精选", "en": "Gilded Shadows Gallery · Editorial Collection", "ja": "夜の密やかな果実 · 編集コレクション", "ko": "침묵의 윤곽 · 편집 컬렉션"},
    subtitle: {"zh": "VOL16 · 正式版", "en": "VOL16 · Edition", "ja": "VOL16 · 正式版", "ko": "VOL16 · 정식판"}
  },
  {
    id: "vol17",
    titles: {"zh": "暗夜吻痕 · 编辑精选", "en": "Gilded Noir Seduction · Editorial Collection", "ja": "秘められた夜の肢体 · 編集コレクション", "ko": "침묵의 곡선 · 편집 컬렉션"},
    subtitle: {"zh": "VOL17 · 正式版", "en": "VOL17 · Edition", "ja": "VOL17 · 正式版", "ko": "VOL17 · 정식판"}
  },
  {
    id: "vol18",
    titles: {"zh": "夜色未央时 · 编辑精选", "en": "Gilded Shadows Unveiled · Editorial Collection", "ja": "夜の感触 · 編集コレクション", "ko": "정적 속의 긴장 · 편집 컬렉션"},
    subtitle: {"zh": "VOL18 · 正式版", "en": "VOL18 · Edition", "ja": "VOL18 · 正式版", "ko": "VOL18 · 정식판"}
  },


];

const langConfig = {
  zh: {label:"中文版",nextLabel:"EN",nextLang:"en"},
  en: {label:"English",nextLabel:"中文",nextLang:"zh"},
  ja: {label:"日本語",nextLabel:"EN",nextLang:"en"},
  ko: {label:"한국어",nextLabel:"EN",nextLang:"en"}
};
