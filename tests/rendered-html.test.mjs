import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = (await response.text()).replace(/\u00a0/g, " ");
  assert.match(html, /<title>Михаил Марков — Content &amp; Communications<\/title>/i);
  assert.match(html, /Редактор и руководитель контента и коммуникаций\. 7\+ лет работаю с текстами и контентом/);
  assert.match(html, /от статей и digital-проектов до стратегий и видеопродакшна/);
  assert.match(html, /Работы/);
  assert.match(html, /С нуля собрал и возглавил редакцию из 9 человек/);
  assert.match(html, /Работа с отзывами: разбор ошибок, коммуникация с клиентами и ToV/);
  assert.match(html, /Каталог «ПромМаш Тест»/);
  assert.match(html, /Редакционное сопровождение мероприятий/);
  assert.match(html, /ПромМаш Тест на выставке/);
  assert.match(html, /ПМЭФ/);
  assert.match(html, /«Нефтегаз»/);
  assert.match(html, /редакционный контроль реализации застройки/);
  assert.match(html, /mailto:mmarkovvvv@gmail\.com/);
  assert.match(html, /class="contact-icon-link"/);
  assert.match(html, /aria-label="Medium"/);
  assert.doesNotMatch(html, />Medium\s*[↗]?<\/a>/);
  assert.doesNotMatch(html, /profile-photo|mikhail-markov-portrait/);
  assert.match(html, /Открыть страницу 1/);
  assert.match(html, /Открыть страницу 5/);
  assert.doesNotMatch(html, /Здесь/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("keeps the portfolio assets and shell metadata aligned", async () => {
  const [page, styles, lightbox, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/LightboxImage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const assets = [
    "sercons-telegram-channel-content-analysis.png",
    "georgy-garkusha-personal-brand-strategy.png",
    "negative-reviews-client-communication-tov.png",
    "psb-predprinimatika-program-landing.png",
    "article-to-boldly-go-to-san-diego-comic-con-international.png",
    "article-atex-flour-cover.png",
    "article-stop-writing-polite-replies-cover.png",
    "kommersant-logo.svg",
    "video-production-interview-on-site.png",
    "video-production-factory-shoot.png",
    "video-production-studio-setup.png",
    "sercons-corporate-monopoly.png",
    "prommash-test-corporate-catalog.png",
    "event-editorial-prommash-test-meeting-zone.png",
    "event-editorial-prommash-test-exhibition-booth.png",
    "yubiley-neftegaz-interview-nadein-page-68.png",
    "yubiley-neftegaz-interview-nadein-page-69.png",
    "yubiley-neftegaz-interview-nadein-page-70.png",
    "yubiley-neftegaz-interview-nadein-page-71.png",
    "yubiley-neftegaz-interview-nadein-page-72.png",
  ];

  await Promise.all(
    assets.map((asset) => access(new URL(`../public/media/${asset}`, import.meta.url))),
  );

  assert.match(page, /const projectGroups(?:: ProjectGroup\[\])? = \[/);
  assert.match(page, /Редактура и контент/);
  assert.match(page, /Личные бренды/);
  assert.match(page, /Стратегия и сценарии/);
  assert.match(page, /Статьи на английском языке/);
  assert.match(page, /Видео и production/);
  assert.match(page, /GEM EXPO \+ FEST \+ FORUM/);
  const sitesPosition = page.indexOf('number: "02",\n    title: "Сайты и digital"');
  const personalBrandsPosition = page.indexOf('number: "03",\n    title: "Личные бренды"');
  const strategyPosition = page.indexOf('number: "04",\n    title: "Стратегия и сценарии"');
  assert.ok(sitesPosition >= 0 && personalBrandsPosition > sitesPosition && strategyPosition > personalBrandsPosition);
  assert.match(page, /Бренд CEO/);
  assert.match(page, /Бренд CCO/);
  assert.match(page, /«Работай на нефть, работай!»/);
  assert.match(page, /yubiley-neftegaz-interview-nadein-page-68\.png/);
  assert.match(page, /yubiley-neftegaz-interview-nadein-page-69\.png/);
  assert.match(page, /yubiley-neftegaz-interview-nadein-page-70\.png/);
  assert.match(page, /yubiley-neftegaz-interview-nadein-page-71\.png/);
  assert.match(page, /yubiley-neftegaz-interview-nadein-page-72\.png/);
  assert.match(page, /Корпоративная «Монополия»/);
  assert.match(page, /Редакционное сопровождение мероприятий/);
  assert.match(page, /ПромМаш Тест на выставке/);
  assert.match(page, /event-editorial-prommash-test-meeting-zone\.png/);
  assert.match(page, /event-editorial-prommash-test-exhibition-booth\.png/);
  assert.match(page, /MagazineReader/);
  assert.match(page, /project-wide/);
  assert.match(page, /www\.kommersant\.ru\/doc\/7325577/);
  assert.match(page, /www\.kommersant\.ru\/doc\/7694230/);
  assert.match(page, /docs\.google\.com\/document\/d\/1XhQmbcGTu61mQ-cOjkZ1KZ9OnDGPEI8RVSBk2UFirlw/);
  assert.match(page, /Контакты/);
  assert.match(page, /www\.kommersant\.ru\/doc\/7325577/);
  assert.match(page, /www\.kommersant\.ru\/doc\/7694230/);
  assert.match(page, /project-featured/);
  assert.match(page, /keepRussianWordsTogether/);
  assert.match(page, /shortRussianWordPattern/);
  assert.match(page, /ContactIcon/);
  assert.match(page, /kind="email"/);
  assert.match(page, /kind="telegram"/);
  assert.match(page, /kind="setka"/);
  assert.match(page, /kind="medium"/);
  assert.match(page, /Сценарии, storyboard, интервью, съёмки, постпродакшн/);
  assert.match(page, /youtube\.com\/watch\?v=TaJ63sbGwFE&t=52s/);
  assert.match(page, /youtube\.com\/watch\?v=coh1qFLm2vc&t=133s/);
  assert.match(page, /stop-writing-polite-replies-start-fixing-problems-9d896f9f9620/);
  assert.doesNotMatch(page, /personal-branding-in-high-stakes-industries-a-practical-system-not-a-vibe/);
  assert.match(page, /the-explosion-hazard-sitting-on-your-breakfast-table/);
  assert.match(styles, /\.intro-copy[\s\S]*max-width: 920px/);
  assert.doesNotMatch(styles, /\.profile-photo/);
  assert.match(styles, /\.portfolio-image[\s\S]*object-fit: contain/);
  assert.match(styles, /\.project-index/);
  assert.match(styles, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles, /text-wrap: pretty/);
  assert.match(page, /MagazineReader/);
  assert.match(styles, /\.magazine-page-strip/);
  assert.match(styles, /\.magazine-page-trigger/);
  assert.doesNotMatch(styles, /magazine-reader-page-turn/);
  assert.match(page, /thumbnailPath/);
  assert.doesNotMatch(styles, /filter:\s*grayscale/i);
  assert.match(lightbox, /thumbnailSrc/);
  assert.doesNotMatch(styles, /\.image-trigger|\.lightbox/);
  assert.doesNotMatch(lightbox, /"use client"|useState|useEffect|onClick|lightbox/);
  assert.doesNotMatch(lightbox, /image-zoom-hint/);
  assert.match(page, /className="intro-copy" id="about"/);
  assert.doesNotMatch(page, /<h2>Обо мне<\/h2>/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview|codex-preview/);
  assert.match(layout, /title: "Михаил Марков — Content & Communications"/);
  assert.match(layout, /<html lang="ru">/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
