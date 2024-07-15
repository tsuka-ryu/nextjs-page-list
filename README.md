# nextjs の pageList を取得する workflow

- ページ内からは`Router.router?.pageLoader?.getPageList`で取得できるが、middleware や api route 内だと取得できないっぽいので、静的に吐き出す
- `get-page-list.js`：gptに書いてもらったスクリプト
- `src/constants/page-list.ts`：事前に生成したファイル