import path from "path";
import fs from "fs";

const prevPath = path.join(process.cwd(), "src/constants/page-list.mjs");
const nextPath = path.join(process.cwd(), "page-list.mjs");

// 非同期関数内でのawaitの使用例
async function loadPageList() {
  const prevPageList = await import(prevPath);
  const nextPageList = await import(nextPath);

  return [prevPageList, nextPageList];
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...set1].every((item) => set2.has(item));
}

// loadPageList() を呼び出す例
loadPageList()
  .then(([prev, next]) => {
    const { PAGES: prevPages } = prev;
    const { PAGES: nextPages } = next;

    // 同じなら正常終了
    if (arraysAreEqual(prevPages, nextPages)) {
      process.exit(0);
    }

    // 違った場合はPRで新規にファイル作成
    fs.unlink(prevPath);
    fs.rename(nextPath, prevPath);
    process.exit(0);
  })
  .catch((error) => {
    console.error("ページリストをロードできませんでした", error);
  });
