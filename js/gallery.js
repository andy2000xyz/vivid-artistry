// 版本数据 — 每个版本 4 语言标题 + 封面
const editionData = [
    {
        id: "vol1",
        titles: {
            zh: "迷醉的暗夜",
            en: "Gilded Shadows Vol.1",
            ja: "夜の吐息（よるのといき）",
            ko: "빈 공간의 미학"
        },
        subtitle: {
            zh: "Vol.1 · 正式版",
            en: "Vol.1 · First Edition",
            ja: "Vol.1 · 正式版",
            ko: "Vol.1 · 정식판"
        }
    },
    {
        id: "vol2",
        titles: {
            zh: "暗夜生香",
            en: "Gilded Shadows Vol.2",
            ja: "夜の肌のざわめき",
            ko: "균형의 미적 공간"
        },
        subtitle: {
            zh: "Vol.2 · 正式版",
            en: "Vol.2 · Second Edition",
            ja: "Vol.2 · 正式版",
            ko: "Vol.2 · 정식판"
        }
    },
    {
        id: "vol3",
        titles: {
            zh: "暗夜凝脂香",
            en: "Gilded Shadows Vol.3",
            ja: "濡れた月の誘い",
            ko: "침묵의 곡선"
        },
        subtitle: {
            zh: "Vol.3 · 正式版",
            en: "Vol.3 · Third Edition",
            ja: "Vol.3 · 正式版",
            ko: "Vol.3 · 정식판"
        }
    },
    {
        id: "vol4",
        titles: {
            zh: "暗香浮动的夜",
            en: "Gilded Shadows Vol. 4",
            ja: "艶めく肌の旋律",
            ko: "정적의 선"
        },
        subtitle: {
            zh: "Vol.4 · 正式版",
            en: "Vol.4 · Fourth Edition",
            ja: "Vol.4 · 正式版",
            ko: "Vol.4 · 정식판"
        }
    }
];

// 语言配置
const langConfig = {
    zh: { label: "中文版", nextLabel: "EN", nextLang: "en" },
    en: { label: "English", nextLabel: "中文", nextLang: "zh" },
    ja: { label: "日本語", nextLabel: "EN", nextLang: "en" },
    ko: { label: "한국어", nextLabel: "EN", nextLang: "en" }
};
