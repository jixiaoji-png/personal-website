export interface Project {
  slug: string
  title: string
  desc: string
  tags: string[]
  cover: string
  coverBg: string
  detail: string[]
  demo?: string
  repo?: string
}

export const projects: Project[] = [
  {
    slug: 'qingyu-site',
    title: '青屿 · 个人主页',
    desc: '本网站。墨纸森系风格的单页应用，支持博客 Markdown 动态加载、响应式布局与无障碍优化。',
    tags: ['React', 'TypeScript', 'Vite', 'Markdown'],
    cover: '青屿',
    coverBg: 'linear-gradient(135deg, #E3EDE4 0%, #F3E9D8 100%)',
    detail: [
      '从设计系统到组件，全部自行定义：米纸底色、松墨绿主色、衬线标题，构建独特的「墨纸森系」视觉语言。',
      '博客通过 Vite import.meta.glob 动态加载 Markdown，新增文章文件即可自动出现在列表中。',
      '实现了滚动渐显、移动端汉堡菜单、表单校验反馈与 prefers-reduced-motion 降级。',
    ],
    demo: '#/',
  },
  {
    slug: 'ai-chat-system',
    title: 'AI 聊天对话系统',
    desc: '课程综合项目：Spring Boot + MyBatis-Plus + MySQL 后端、Python 本地模型推理服务与 Vue3 前端三位一体，支持远端 API 与本地模型双模式聊天。',
    tags: ['Spring Boot', 'MyBatis-Plus', 'Vue3', 'Python'],
    cover: '聊',
    coverBg: 'linear-gradient(135deg, #F5E6CF 0%, #DFE8D9 100%)',
    detail: [
      '后端基于 Java 17 + Spring Boot + MyBatis-Plus 构建，完成用户鉴权、会话管理、消息持久化与模型信息配置。',
      '本地模型服务加载训练好的 .pth 权重并通过 HTTP 接口转发，聊天请求按模型类型路由到远端 API 或本地推理。',
      '前端使用 Vue3 + Vite + Element Plus 实现登录注册、多会话聊天与个人中心，token 存储于 localStorage。',
    ],
  },
  {
    slug: 'llm-train',
    title: 'LLM 训练实践（GPT 风格）',
    desc: '从零实现的 256 维小型 GPT 模型训练项目：预训练、全参 SFT 与 LoRA 微调全流程，支持 checkpoint 断点续训。',
    tags: ['PyTorch', 'GPT', 'SFT', 'LoRA'],
    cover: '练',
    coverBg: 'linear-gradient(135deg, #D8E6D4 0%, #F1E4D2 100%)',
    detail: [
      '基于 RoPE、RMSNorm、GQA 构建 GPTForCausalLM，vocab_size 6400、hidden_size 256，兼顾效果与训练成本。',
      '实现 pretrain / SFT / LoRA 三套训练脚本与断点续训，LoRA rank=8 权重仅 0.13MB，显著降低微调成本。',
      '推理 demo 支持温度、top_p 采样与 system/user/assistant 对话模板，CPU 可运行。',
    ],
  },
  {
    slug: 'mcu-51',
    title: '51 单片机课程设计',
    desc: '基于 51 单片机的嵌入式课程实践：Keil C51 编写、Proteus 仿真验证，完成外设驱动与综合应用设计。',
    tags: ['51 单片机', 'Keil C51', 'Proteus'],
    cover: '片',
    coverBg: 'linear-gradient(135deg, #E8DFD0 0%, #CBE0D3 100%)',
    detail: [
      '使用 Keil C51 完成程序编写与编译，掌握寄存器操作、定时器、中断与串口通信等基础能力。',
      '通过 Proteus 进行电路仿真与调试，验证数码管、按键、蜂鸣器等外设驱动逻辑。',
    ],
  },
  {
    slug: 'android-dev',
    title: 'Android 应用开发练习',
    desc: 'Android 开发入门实践：基于 Android Studio + SDK 完成界面搭建、组件使用与模拟器联调。',
    tags: ['Android', 'Android Studio', 'SDK'],
    cover: '端',
    coverBg: 'linear-gradient(135deg, #F2E8D8 0%, #DCE9DC 100%)',
    detail: [
      '使用 Android Studio 构建工程，配置 SDK 与模拟器环境，完成 Activity、布局与事件处理的练习。',
      '逐步掌握四大组件、Intent 跳转与数据存储，通过模拟器进行真机化联调。',
    ],
  },
]
