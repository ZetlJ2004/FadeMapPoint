// 霓虹町 (Neon Town) 点位数据
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
          label: 'A大压2楼跳投眼',
          images: ['/maps/neon/image1.png', '/maps/neon/image2.png'],
        },
        {
          id: '2',
          label: 'A包全看包点后一步到白边跳投可看死点',
          images: ['/maps/neon/image3.png', '/maps/neon/image4.png'],
        },
        {
          id: '3',
          label: 'A包全看灯下只看包点跳投',
          images: ['/maps/neon/image5.png', '/maps/neon/image6.png'],
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
          label: '二楼高点跳投眼看二楼他家看不到死点',
          images: ['/maps/neon/image7.png', '/maps/neon/image8.png'],
        },
        {
          id: '2',
          label: 'B全看',
          images: [],
        },
      ],
    },
  ],
}

// 防守方点位
const defenseSpots: SpotCategory = {
  key: 'defense',
  label: '防守方',
  sections: [
    {
      key: 'a',
      label: 'A 点',
      header: undefined,
      spots: [
        {
          id: '1',
          label: 'A前压一步跳投眼',
          images: ['/maps/neon/image9.png', '/maps/neon/image10.png'],
        },
        {
          id: '2',
          label: '2楼清近点A大跳投眼',
          images: ['/maps/neon/image11.png', '/maps/neon/image12.png'],
        },
        {
          id: '3',
          label: '包点A大反清跳投眼',
          images: ['/maps/neon/image13.png', '/maps/neon/image14.png'],
        },
        {
          id: '4',
          label: '2楼蹲UI对伞直投',
          images: ['/maps/neon/image15.png', '/maps/neon/image16.png'],
        },
        {
          id: '5',
          label: '包点A近点反清直投',
          images: ['/maps/neon/image17.png', '/maps/neon/image18.png'],
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
          label: '2楼右下角瞬爆',
          images: ['/maps/neon/image19.png'],
        },
        {
          id: '2',
          label: '2楼丢到死点房檐',
          images: ['/maps/neon/image20.png'],
        },
        {
          id: '3',
          label: '2楼丢到进门房檐',
          images: [],
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
      spots: [
        {
          id: '1',
          label: '家方向看楼下跳投',
          images: ['/maps/neon/image21.png', '/maps/neon/image22.png'],
        },
      ],
    },
    {
      key: 'b',
      label: 'B 点',
      header: undefined,
      spots: [], // 暂无内容
    },
  ],
}

// 按 category key 索引
export const neonSpots: Record<string, SpotCategory> = {
  attack: attackSpots,
  defense: defenseSpots,
  retake: retakeSpots,
}
