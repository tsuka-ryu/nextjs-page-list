# nextjs の pageList を取得する workflow

ページ内からは`Router.router?.pageLoader?.getPageList`で取得できるが、middleware や api route 内だと取得できないっぽいので、静的に吐き出す

## how to use
- `.github/workflows/get-page-list.yml`：本体
- `workflow/get-page-list.js`：ページリストを吐き出すスクリプト
- `workflow/work.mjs`：差分をチェックするスクリプト

## memo
- [GitHub ActionsでのPR操作権限はデフォルトでオフになったよ](https://zenn.dev/kenghaya/articles/d7f766e5db6437)