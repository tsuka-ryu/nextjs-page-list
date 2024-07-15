const fs = require("fs");
const path = require("path");

// 再帰的にディレクトリを走査してファイルパスを取得する関数
const getAllPaths = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      getAllPaths(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  });

  return filelist;
};

// pagesディレクトリのパス
const pagesDir = path.join(process.cwd(), "src", "pages");

// pagesディレクトリ配下の全てのファイルパスを取得
const paths = getAllPaths(pagesDir);

// ファイルパスをページパスに変換
const pagePaths = paths.map((filePath) => {
  // pagesディレクトリを基準に相対パスを取得
  const relativePath = path.relative(pagesDir, filePath);

  // 拡張子を除去して、Next.jsのページパス形式に変換
  let pagePath =
    "/" +
    relativePath
      .replace(/\\/g, "/")
      .replace(/\.jsx?$/, "")
      .replace(/\/index$/, "")
      .replace("index.tsx", "");

  // 末尾のスラッシュを除去
  if (pagePath !== "/" && pagePath.endsWith("/")) {
    pagePath = pagePath.slice(0, -1);
  }

  return pagePath;
});

// 結果を表示
console.log(pagePaths);

// ファイルに書き出し
fs.writeFileSync("page-list.json", JSON.stringify(pagePaths));
