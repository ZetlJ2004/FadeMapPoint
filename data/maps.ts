// 无畏契约地图数据
// 每个地图定义其名称、代号、以及点位分类

export interface MapSection {
  key: string
  label: string
}

export interface MapCategory {
  key: string
  label: string
  icon: string
  sections: MapSection[]
}

export interface MapInfo {
  id: string
  name: string        // 中文名
  nameEn: string      // 英文名
  splash: string      // 封面图色
  splashImage?: string // 封面图片（优先于色块）
  categories: MapCategory[]
}

// 通用点位分类：A点、B点、中路
const AB_MID_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
  { key: 'mid', label: '中路' },
]

const ABC_MID_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
  { key: 'c', label: 'C 点' },
  { key: 'mid', label: '中路' },
]

const HAVEN_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
  { key: 'c', label: 'C 点' },
  { key: 'mid', label: '中路' },
  { key: 'garage', label: '车库' },
]

// 通用分类：进攻 / 防守 / 回防
function categories(sections: MapSection[]): MapCategory[] {
  return [
    { key: 'attack',  label: '进攻方', icon: '⚔️', sections },
    { key: 'defense', label: '防守方', icon: '🛡️', sections },
    { key: 'retake',  label: '回防',   icon: '🔄', sections },
  ]
}

// 微风岛屿专用：回防包含 A/B/中
const BREEZE_ATTACK_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
]

const BREEZE_DEFENSE_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
]

const BREEZE_RETAKE_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
  { key: 'mid', label: '中路' },
]

function breezeCategories(): MapCategory[] {
  return [
    { key: 'attack',  label: '进攻方', icon: '⚔️', sections: BREEZE_ATTACK_SECTIONS },
    { key: 'defense', label: '防守方', icon: '🛡️', sections: BREEZE_DEFENSE_SECTIONS },
    { key: 'retake',  label: '回防',   icon: '🔄', sections: BREEZE_RETAKE_SECTIONS },
  ]
}

// 霓虹町：A/B 两个点
const NEON_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
]

// 天枢云阙专用：全含 A/B/中
const SKYHUB_SECTIONS: MapSection[] = [
  { key: 'a', label: 'A 点' },
  { key: 'b', label: 'B 点' },
  { key: 'mid', label: '中路' },
]

function skyhubCategories(): MapCategory[] {
  return [
    { key: 'attack',  label: '进攻方', icon: '⚔️', sections: SKYHUB_SECTIONS },
    { key: 'defense', label: '防守方', icon: '🛡️', sections: SKYHUB_SECTIONS },
    { key: 'retake',  label: '回防',   icon: '🔄', sections: SKYHUB_SECTIONS },
  ]
}

export const MAPS: MapInfo[] = [
  {
    id: 'breeze', name: '微风岛屿', nameEn: 'Breeze',
    splash: '#5B8C5A',
    splashImage: '/maps/breeze/map.png',
    categories: breezeCategories(),
  },
  {
    id: 'neon', name: '霓虹町', nameEn: 'Neon Town',
    splash: '#8B2E8B',
    splashImage: '/maps/neon/map.png',
    categories: categories(NEON_SECTIONS),
  },
  {
    id: 'skyhub', name: '天枢云阙', nameEn: 'Sky Hub',
    splash: '#4A90D9',
    splashImage: '/maps/skyhub/map.jpg',
    categories: skyhubCategories(),
  },
  {
    id: 'bind', name: '源工重镇', nameEn: 'Bind',
    splash: '#8B4513',
    categories: categories(AB_MID_SECTIONS),
  },
  {
    id: 'haven', name: '隐世修所', nameEn: 'Haven',
    splash: '#2E8B57',
    categories: categories(HAVEN_SECTIONS),
  },
  {
    id: 'split', name: '裂变峡谷', nameEn: 'Split',
    splash: '#4169E1',
    categories: categories(AB_MID_SECTIONS),
  },
  {
    id: 'ascent', name: '亚海悬城', nameEn: 'Ascent',
    splash: '#DAA520',
    categories: categories(AB_MID_SECTIONS),
  },
  {
    id: 'pearl', name: '深海明珠', nameEn: 'Pearl',
    splash: '#20B2AA',
    categories: categories(AB_MID_SECTIONS),
  },
  {
    id: 'lotus', name: '莲华古城', nameEn: 'Lotus',
    splash: '#FF69B4',
    categories: categories(ABC_MID_SECTIONS),
  },
]
