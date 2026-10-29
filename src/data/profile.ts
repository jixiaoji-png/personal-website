export interface TimelineItem {
  time: string
  title: string
  desc: string
}

export interface Profile {
  name: string
  englishName: string
  role: string
  slogan: string
  intro: string[]
  timeline: TimelineItem[]
}

export const profile: Profile = {
  name: '纪嘉雪',
  englishName: 'QINGYU',
  role: '大连民族大学 · 物联网工程241班学生',
  slogan: '把复杂的世界，整理成温柔而清晰的代码。',
  intro: [
    '你好，我是纪嘉雪，大连民族大学物联网工程专业 241 班学生。主修 Java / Spring Boot / MyBatis-Plus 后端开发，熟悉 MyBatis-Plus 数据层技术；同时在学习 51 单片机（Keil C51 / Proteus 仿真）、Android 开发（Android Studio / SDK / 模拟器）与前端开发（Vite）。',
    '我相信技术应当服务于生活与表达，这也是「青屿」这个小小主页存在的意义：一块属于自己的、安静而开放的小岛，记录学习路上的代码、思考与成长。',
  ],
  timeline: [
    {
      time: '2024 — 至今',
      title: '大连民族大学 · 物联网工程（物联241）',
      desc: '主修 Java / Spring Boot / MyBatis-Plus 开发，熟悉 MyBatis-Plus 数据层技术，并持续拓展嵌入式与移动开发能力。',
    },
    {
      time: '2025',
      title: 'Java 后端开发实践',
      desc: '基于 Spring Boot + MyBatis-Plus + MySQL 完成课程项目后端开发，熟悉 RESTful 接口设计与数据库建模。',
    },
    {
      time: '2026',
      title: '嵌入式、移动端与前端拓展学习',
      desc: '学习 51 单片机（Keil C51 / Proteus 仿真）、Android 开发（Android Studio / SDK / 模拟器）与 Vite 前端工程化。',
    },
  ],
}
