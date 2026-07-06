// 微风岛屿 (Breeze) 点位数据
// 每个点位包含文字描述和对应的图片列表

export interface SpotItem {
  id: string       // 序号 ①②③...
  label: string    // 点位名称
  images: string[] // 图片路径列表
}

export interface SpotSection {
  key: string
  label: string
  header?: string   // 可选子分类，如 "反清"
  spots: SpotItem[]
}

export interface SpotCategory {
  key: string
  label: string
  sections: SpotSection[]
}

// 防守方点位
const defenseSpots: SpotCategory = {
  key: 'defense',
  label: '防守方',
  sections: [
    {
      key: 'a',
      label: 'A 点',
      header: '反清',
      spots: [
        {
          id: '1',
          label: 'A大前压眼一步跳投',
          images: ['/maps/breeze/image1.png', '/maps/breeze/image2.png'],
        },
        {
          id: '2',
          label: 'A包高箱跳投',
          images: ['/maps/breeze/image3.png', '/maps/breeze/image4.png'],
        },
        {
          id: '3',
          label: 'A门上一步跳投',
          images: [],
        },
        {
          id: '4',
          label: '包点黄箱后塔顶25m跳投、天空眼25m一步跳投',
          images: [],
        },
        {
          id: '5',
          label: '两个天空眼跳投（慎用）',
          images: ['/maps/breeze/image5.png', '/maps/breeze/image6.png'],
        },
      ],
    },
    {
      key: 'b',
      label: 'B 点',
      header: '反清',
      spots: [
        {
          id: '1',
          label: 'B大围墙城堡直投眼',
          images: ['/maps/breeze/image7.png'],
        },
        {
          id: '2',
          label: 'B包高塔跳投',
          images: ['/maps/breeze/image8.png', '/maps/breeze/image9.png'],
        },
        {
          id: '3',
          label: '底线城堡跳投反清',
          images: ['/maps/breeze/image10.png', '/maps/breeze/image11.png'],
        },
        {
          id: '4',
          label: 'B小高塔跳投反清',
          images: ['/maps/breeze/image12.png', '/maps/breeze/image13.png'],
        },
      ],
    },
  ],
}

// 回防方点位
const retakeSpots: SpotCategory = {
  key: 'retake',
  label: '回防',
  sections: [
    {
      key: 'a',
      label: 'A 点',
      header: undefined,
      spots: [], // 暂无内容
    },
    {
      key: 'b',
      label: 'B 点',
      header: undefined,
      spots: [
        {
          id: '1',
          label: 'B门城门卡一步投眼，左侧城墙一大步跳投眼',
          images: ['/maps/breeze/image14.png', '/maps/breeze/image15.png', '/maps/breeze/image16.png'],
        },
      ],
    },
    {
      key: 'mid',
      label: '中路',
      header: undefined,
      spots: [
        {
          id: '1',
          label: 'B小AB连跳投',
          images: ['/maps/breeze/image17.png', '/maps/breeze/image18.png'],
        },
        {
          id: '2',
          label: '中路全看跳投',
          images: ['/maps/breeze/image19.png', '/maps/breeze/image20.png'],
        },
      ],
    },
  ],
}

// 进攻方点位
const attackSpots: SpotCategory = {
  key: 'attack',
  label: '进攻方',
  sections: [
    {
      key: 'a',
      label: 'A 点',
      header: undefined,
      spots: [
        {
          id: '1',
          label: 'A大塔顶直接丢眼',
          images: ['/maps/breeze/image21.png'],
        },
        {
          id: '2',
          label: '进点后跳投天空眼',
          images: ['/maps/breeze/image22.png', '/maps/breeze/image23.png'],
        },
        {
          id: '3',
          label: '灵活一步跳投防守眼',
          images: ['/maps/breeze/image24.png', '/maps/breeze/image25.png'],
        },
      ],
    },
    {
      key: 'b',
      label: 'B 点',
      header: undefined,
      spots: [
        {
          id: '1',
          label: 'B门外箱子卡城墙跳投',
          images: ['/maps/breeze/image26.png', '/maps/breeze/image27.png'],
        },
        {
          id: '2',
          label: 'B大高塔一小步跳投眼',
          images: ['/maps/breeze/image28.png', '/maps/breeze/image29.png'],
        },
      ],
    },
  ],
}

// 按 category key 索引
export const breezeSpots: Record<string, SpotCategory> = {
  attack: attackSpots,
  defense: defenseSpots,
  retake: retakeSpots,
}
