// 文章类型定义，后面对接 Go 后端时字段跟后端 struct 对齐
// q 为什么没有内容呢？只有summary?
// a 故意的。首页列表只显示摘要，不需要全文（省流量）。做文章详情页时再加 content: string 字段。
// a 实际项目里列表接口返回 summary，详情接口返回 content，跟 Go 后端一样的设计。
export interface Article {
  id: number
  title: string
  summary: string
  content: string
  date: string
  tags: string[]
}
