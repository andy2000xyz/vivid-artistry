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
  {
    id: "vol19",
    titles: {"zh": "欲火，发燃的时刻", "en": "Midnight Aurelian Echoes", "ja": "蜜の誘惑", "ko": "\uc544\ud0a4\ud14d\ucc98 \uac00\uc774\ub4dc\ub77c\uc778"},
    subtitle: {"zh": "VOL19 · 正式版", "en": "VOL19 · Edition", "ja": "VOL19 · 正式版", "ko": "VOL19 · 정식판"}
  },
  {
    id: "vol20",
    titles: {"zh": "禁忌之吻", "en": "Crimson Echoes: Vol. 20", "ja": "宵闇の誘惑", "ko": "V20 \uc2dc\uc2a4\ud15c \uac00\uc774\ub4dc"},
    subtitle: {"zh": "VOL20 · 正式版", "en": "VOL20 · Edition", "ja": "VOL20 · 正式版", "ko": "VOL20 · 정식판"}
  },
  {
    id: "vol21",
    titles: {"zh": "禁区边缘的诱惑", "en": "Crimson Gold Nocturne", "ja": "官能の輪郭", "ko": "\uc7ac\uc815\uc758\ub41c \uc2dc\uc2a4\ud15c"},
    subtitle: {"zh": "VOL21 · 正式版", "en": "VOL21 · Edition", "ja": "VOL21 · 正式版", "ko": "VOL21 · 정식판"}
  },
  {
    id: "vol22",
    titles: {"zh": "秘境回眸", "en": "Midnight Noir V22", "ja": "残された熱よ、きらめく肌", "ko": "\ubaa8\ub4c8\ud615 \uc0ac\uace0\uc758 \uc7ac\uad6c\uc131"},
    subtitle: {"zh": "VOL22 · 正式版", "en": "VOL22 · Edition", "ja": "VOL22 · 正式版", "ko": "VOL22 · 정식판"}
  },
  {
    id: "vol23",
    titles: {"zh": "赤焰诱惑场域", "en": "Velvet Night Echoes", "ja": "蜜月逃避行", "ko": "\uad6c\uc870\ud654\ub41c \uba85\ub8cc\ud568"},
    subtitle: {"zh": "VOL23 · 正式版", "en": "VOL23 · Edition", "ja": "VOL23 · 正式版", "ko": "VOL23 · 정식판"}
  },
  {
    id: "vol24",
    titles: {"zh": "心动猎物手册", "en": "Velvet Nocturnes Vol. 24", "ja": "禁断の宵、秘密の温度", "ko": "\uc2dc\uc2a4\ud15c \uba85\ub8cc\ud654 V24"},
    subtitle: {"zh": "VOL24 · 正式版", "en": "VOL24 · Edition", "ja": "VOL24 · 正式版", "ko": "VOL24 · 정식판"}
  },
  {
    id: "vol25",
    titles: {"zh": "无声的禁忌游戏", "en": "Velvet Dusk Noir", "ja": "宵闇の蜜月体温", "ko": "\ucd5c\uc801 \uad6c\uc870\uccb4\uacc4"},
    subtitle: {"zh": "VOL25 · 正式版", "en": "VOL25 · Edition", "ja": "VOL25 · 正式版", "ko": "VOL25 · 정식판"}
  },
  {
    id: "vol26",
    titles: {"zh": "欲望的邀请函", "en": "Crimson Depths Vol. 26", "ja": "夜明けの熱情", "ko": "\uc2dc\uc2a4\ud15c \uc815\uc758 V26"},
    subtitle: {"zh": "VOL26 · 正式版", "en": "VOL26 · Edition", "ja": "VOL26 · 正式版", "ko": "VOL26 · 정식판"}
  },
  {
    id: "vol27",
    titles: {"zh": "迷离禁区", "en": "Velvet Eclipse, Vol 27", "ja": "蜜月後の秘密", "ko": "\ubcfc\ub968 27: \uc791\ub3d9 \ubc29\uc2dd"},
    subtitle: {"zh": "VOL27 · 正式版", "en": "VOL27 · Edition", "ja": "VOL27 · 正式版", "ko": "VOL27 · 정식판"}
  },
  {
    id: "vol28",
    titles: {"zh": "罪欲入梦", "en": "Velvet Depths, Gold Hour", "ja": "夜の螺旋", "ko": "[Vol.28] \ud575\uc2ec \uc544\uce74\uc774\ube0c"},
    subtitle: {"zh": "VOL28 · 正式版", "en": "VOL28 · Edition", "ja": "VOL28 · 正式版", "ko": "VOL28 · 정식판"}
  },



];

const langConfig = {
  zh: {label:"中文版",nextLabel:"EN",nextLang:"en"},
  en: {label:"English",nextLabel:"中文",nextLang:"zh"},
  ja: {label:"日本語",nextLabel:"EN",nextLang:"en"},
  ko: {label:"한국어",nextLabel:"EN",nextLang:"en"}
};
