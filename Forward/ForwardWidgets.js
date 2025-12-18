WidgetMetadata = {
  id: "forward.universal_list",
  title: "全平台片单解析",
  description: "支持解析 豆瓣、IMDb、TMDB 的片单链接",
  settings: [
    {
      name: "url",
      title: "输入片单地址",
      type: "input",
      placeholders: [
        { title: "TMDB 历届奥斯卡最佳影片", value: "https://www.themoviedb.org/list/28-best-picture-winners" },
        { title: "豆瓣电影 Top 250", value: "https://m.douban.com/subject_collection/movie_top250" },
        { title: "豆瓣 全球口碑剧集榜 ", value: "https://m.douban.com/subject_collection/tv_global_best_weekly" },
        { title: "豆瓣 华语口碑剧集榜 ", value: "https://m.douban.com/subject_collection/tv_chinese_best_weekly" },
        { title: "豆瓣 国内口碑综艺榜 ", value: "https://m.douban.com/subject_collection/show_chinese_best_weekly" },
        { title: "IMDb Top 250 movies", value: "https://www.imdb.com/chart/top" }
        { title: "IMDb Top 250 TV shows", value: "https://www.imdb.com/chart/toptv" }
      ]
    }
  ]
};

async function main(params) {
  const url = params.url;
  const response = await Widget.http.get(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
  });
  
  const $ = Widget.html.load(response.data);
  let results = [];

  if (url.includes("themoviedb.org")) {
    // TMDB 解析逻辑
    $(".block.aspect-poster").each((i, el) => {
      const link = $(el).attr("href");
      const match = link.match(/^\/(movie|tv)\/(\d+)/);
      if (match) results.push({ id: match[2], type: "tmdb", mediaType: match[1] });
    });
  } 
  else if (url.includes("douban.com")) {
    // 豆瓣解析逻辑 (通常解析电影名或豆瓣ID)
    $(".item .pic a").each((i, el) => {
      const link = $(el).attr("href");
      const id = link.match(/subject\/(\d+)/)?.[1];
      if (id) results.push({ id: id, type: "douban" });
    });
  }
  else if (url.includes("imdb.com")) {
    // IMDb 解析逻辑 (解析 tt 开头的 ID)
    $(".ipc-title-link-wrapper").each((i, el) => {
      const link = $(el).attr("href");
      const id = link.match(/title\/(tt\d+)/)?.[1];
      if (id) results.push({ id: id, type: "imdb" });
    });
  }

  return results;
}
