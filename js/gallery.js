// 版本数据 — 每个版本 4 语言标题 + 封面
const editionData = [
    {
        id: "vol1",
        titles: {
            zh: "撩人的夜语",
            en: "Gilded Shadows Volume",
            ja: "夜の肌ざわり",
            ko: "단순한 미학"
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
            zh: "夜色微醺时",
            en: "Gilded Shadows Vol.2",
            ja: "夜のぬくもり",
            ko: "순수한 공간"
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
            zh: "暗夜低语时",
            en: "Gilded Shadows Vol.3",
            ja: "うつ伏せの熱帯魚",
            ko: "선의 언어"
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
            zh: "夜色低语时",
            en: "Midnight Velvet Noir",
            ja: "夜の熱帯魚",
            ko: "선의 미학"
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
