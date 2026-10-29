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
    cat: '后端开发',
    items: [
      { name: 'Java', level: 78 },
      { name: 'Spring Boot', level: 72 },
      { name: 'MyBatis-Plus', level: 70 },
      { name: 'MySQL / SQL', level: 68 },
    ],
  },
  {
    cat: '前端开发',
    items: [
      { name: 'HTML / CSS / JavaScript', level: 72 },
      { name: 'React / Vue', level: 68 },
      { name: 'Vite 构建', level: 72 },
      { name: 'TypeScript', level: 62 },
    ],
  },
  {
    cat: '嵌入式与移动端',
    items: [
      { name: '51 单片机（Keil C51 / Proteus）', level: 66 },
      { name: 'Android（Android Studio / SDK）', level: 60 },
      { name: 'Python', level: 62 },
      { name: 'Git 协作', level: 70 },
    ],
  },
]
