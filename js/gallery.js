// 版本数据 — 每个版本 4 语言标题 + 封面
const editionData = [
    {
        id: "vol1",
        titles: {
            zh: "夜色初燃时",
            en: "Gilded Noir Vol.1",
            ja: "夜の吐息、肌の熱",
            ko: "침묵의 극치"
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
            zh: "夜色初绽时",
            en: "Gilded Shadows Vol.2",
            ja: "夜の棘と蜜",
            ko: "침묵의 균열"
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
            zh: "慵懒的禁果",
            en: "Gilded Shadows, Vol.3",
            ja: "夜の熱帯魚",
            ko: "선의 침묵"
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
            zh: "暗夜朱唇",
            en: "Gilded Midnight Muse",
            ja: "夜の熱の息吹",
            ko: "빈 공간의 미학"
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
