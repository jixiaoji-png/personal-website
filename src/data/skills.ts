export interface SkillItem {
  name: string
  level: number // 0-100
}

export interface SkillCategory {
  cat: string
  items: SkillItem[]
}

export const skills: SkillCategory[] = [
  {
    cat: '前端',
    items: [
      { name: 'TypeScript / JavaScript', level: 92 },
      { name: 'React / Vue', level: 90 },
      { name: 'CSS 工程化 / 动效', level: 86 },
      { name: 'Vite / Webpack 构建', level: 84 },
    ],
  },
  {
    cat: '后端与数据',
    items: [
      { name: 'Node.js / Express', level: 82 },
      { name: 'Python / FastAPI', level: 76 },
      { name: 'SQL / MongoDB', level: 78 },
      { name: 'Docker / CI 部署', level: 72 },
    ],
  },
  {
    cat: '设计与其他',
    items: [
      { name: 'Figma / 界面设计', level: 80 },
      { name: '写作 / 技术文档', level: 88 },
      { name: '摄影 / 修图', level: 74 },
      { name: 'Git 协作 / 代码评审', level: 86 },
    ],
  },
]
