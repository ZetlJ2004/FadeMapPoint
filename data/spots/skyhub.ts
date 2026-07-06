// 天枢云阙 (Sky Hub) 点位数据
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
          label: '基础包点全看跳投',
          images: ['/maps/skyhub/image1.png', '/maps/skyhub/image2.png'],
        },
        {
          id: '2',
          label: '高塔一小步跳投',
          images: ['/maps/skyhub/image3.png'],
        },
        {
          id: '3',
          label: '树洞穿模跳投',
          images: ['/maps/skyhub/image4.png'],
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
          label: '冰球一大步到屋檐跳投眼',
          images: ['/maps/skyhub/image5.png', '/maps/skyhub/image6.png'],
        },
        {
          id: '2',
          label: '屋檐一步跳投眼',
          images: ['/maps/skyhub/image7.png'],
        },
        {
          id: '3',
          label: 'B大死点跳投眼',
          images: ['/maps/skyhub/image8.png', '/maps/skyhub/image9.png'],
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
          label: 'B小看A小广场跳投',
          images: ['/maps/skyhub/image10.png', '/maps/skyhub/image11.png'],
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
          label: 'A前压上树跳投眼',
          images: ['/maps/skyhub/image12.png', '/maps/skyhub/image13.png'],
        },
        {
          id: '2',
          label: 'A前压反向树洞直投',
          images: ['/maps/skyhub/image14.png', '/maps/skyhub/image15.png'],
        },
        {
          id: '3',
          label: '门边丢高柱跳投眼',
          images: ['/maps/skyhub/image16.png', '/maps/skyhub/image17.png'],
        },
        {
          id: '4',
          label: '家方向屋檐直投，家方向柱子直投',
          images: ['/maps/skyhub/image18.png', '/maps/skyhub/image19.png', '/maps/skyhub/image20.png'],
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
          label: 'B包前压B大跳投眼',
          images: ['/maps/skyhub/image21.png', '/maps/skyhub/image22.png', '/maps/skyhub/image23.png'],
        },
        {
          id: '2',
          label: 'B小反清包点眼',
          images: ['/maps/skyhub/image24.png', '/maps/skyhub/image25.png'],
        },
        {
          id: '3',
          label: '2楼屋檐B小方向跳投眼',
          images: ['/maps/skyhub/image26.png', '/maps/skyhub/image27.png'],
        },
        {
          id: '4',
          label: '2楼屋檐B包跳投眼',
          images: ['/maps/skyhub/image28.png', '/maps/skyhub/image29.png'],
        },
      ],
    },
    {
      key: 'mid',
      label: '中路',
      header: undefined,
      spots: [],
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
          label: '家方向卡门一步投眼',
          images: ['/maps/skyhub/image30.png', '/maps/skyhub/image31.png'],
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
          label: '家方向冰球直投眼',
          images: ['/maps/skyhub/image32.png', '/maps/skyhub/image33.png'],
        },
        {
          id: '2',
          label: '家方向2楼边直投眼',
          images: ['/maps/skyhub/image34.png', '/maps/skyhub/image35.png'],
        },
      ],
    },
    {
      key: 'mid',
      label: '中路',
      header: undefined,
      spots: [],
    },
  ],
}

// 按 category key 索引
export const skyhubSpots: Record<string, SpotCategory> = {
  attack: attackSpots,
  defense: defenseSpots,
  retake: retakeSpots,
}
