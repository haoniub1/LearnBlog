// 文章类型定义，后面对接 Go 后端时字段跟后端 struct 对齐
// q 为什么没有内容呢？只有summary?
// a 故意的。首页列表只显示摘要，不需要全文（省流量）。做文章详情页时再加 content: string 字段。
// a 实际项目里列表接口返回 summary，详情接口返回 content，跟 Go 后端一样的设计。
export interface Article {
  id: number
  title: string
  summary: string
  // q 那么获取列表的时候 是不是内容也获取到了？是不是分为两个接口会好点？所以用两个类型
  // a 对，你说得对。正式项目应该拆成 ArticleSummary（不含 content）和 ArticleDetail extends ArticleSummary（含 content）。
  // a 类比 Go：ArticleSummary struct 嵌入到 ArticleDetail struct。现在 Mock 阶段先偷懒用一个，后面对接后端时拆开。
  content: string
  date: string
  tags: string[]
}
