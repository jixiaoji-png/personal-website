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
  name: '林嘉雪',
  englishName: 'QINGYU',
  role: '前端开发工程师 / 独立创作者',
  slogan: '把复杂的世界，整理成温柔而清晰的代码。',
  intro: [
    '你好，我是嘉雪，一名热爱前端与交互设计的产品型工程师。我相信好的网站不只是信息的陈列，更是一次次有温度的对话——所以我总在追求「干净、克制、有呼吸感」的界面。',
    '工作之外，我喜欢写作、摄影与徒步。我相信技术应当服务于生活与表达，这也是「青屿」这个小小主页存在的意义：一块属于自己的、安静而开放的小岛。',
  ],
  timeline: [
    {
      time: '2023 — 至今',
      title: '前端开发工程师 · 某互联网公司',
      desc: '负责核心业务前端架构，主导组件库建设与性能优化，推动团队 TypeScript 覆盖率从 40% 提升至 90%。',
    },
    {
      time: '2021 — 2023',
      title: '全栈开发 · 创业团队',
      desc: '从零搭建产品 Web 端与数据看板，参与用户增长与交互设计，获得种子轮融资后随产品并入大厂。',
    },
    {
      time: '2017 — 2021',
      title: '软件工程 · 本科',
      desc: '主修 Web 工程与人机交互，校技术社团负责人，曾获省级程序设计竞赛一等奖。',
    },
  ],
}
