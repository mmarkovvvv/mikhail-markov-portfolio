import LightboxImage from "./LightboxImage";
import MagazineReader from "./MagazineReader";

type ProjectImage = {
  src: string;
  alt: string;
  ratio: number;
};

type Project = {
  number: string;
  category: string;
  title: string;
  text: string;
  featured?: boolean;
  wide?: boolean;
  image?: string;
  alt?: string;
  type?: "text" | "link";
  ratio?: number;
  gallery?: ProjectImage[];
  imageKind?: "logo" | "article-cover";
  links?: { label: string; href: string }[];
  href?: string;
  date?: string;
  readTime?: string;
};

type ProjectGroup = {
  number: string;
  displayNumber?: string;
  title: string;
  projects: Project[];
};

function thumbnailPath(src: string) {
  return src.endsWith(".png")
    ? src.replace("/media/", "/media/thumbs/").replace(".png", ".jpg")
    : undefined;
}

const shortRussianWordPattern = /(^|[\s(])((?:а|в|во|и|к|ко|о|об|от|по|с|со|у|за|из|на|не|но|ни|да|же|ли|бы|я|мы|ты|он|она|оно|они|вы|это)\s+)/giu;

function keepRussianWordsTogether(text: string) {
  return text.replace(shortRussianWordPattern, (match) => match.replace(/\s+$/, "\u00a0"));
}

type ContactIconKind = "email" | "telegram" | "setka" | "medium";

function ContactIcon({ kind }: { kind: ContactIconKind }) {
  if (kind === "email") {
    return (
      <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 5.5v13h3V9.2l6 4.5 6-4.5v9.3h3v-13l-9 6.8-9-6.8Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "telegram") {
    return (
      <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m21.2 4.5-3 14.2c-.2 1-0.8 1.2-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.8.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7 12.9l-4.4-1.4c-1-.3-1-1 .2-1.5L20 3.9c.8-.3 1.5.2 1.2.6Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "setka") {
    return (
      <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h4l5 7 5-7h4v14h-4v-8l-5 7-5-7v8H3V5Z" fill="currentColor" />
    </svg>
  );
}

const projectGroups: ProjectGroup[] = [
  {
    number: "01",
    title: "Редактура и контент",
    projects: [
      {
        number: "01",
        category: "Контент и редактура",
        title: "С нуля собрал и возглавил редакцию из 9 человек",
        text: "Собрал редакцию из 9 человек и запустил единую контент-систему: ToV, редакционную политику, стратегию и production pipeline.",
        featured: true,
        image: "/media/sercons-telegram-channel-content-analysis.png",
        alt: "Презентация стратегии контента для Telegram-канала Sercons",
        ratio: 2442 / 880,
      },
      {
        number: "02",
        category: "PR & Media Presence",
        title: "Экспертные статьи в «Коммерсанте»",
        text: "Переписал и спродюсировал экспертные статьи для «Коммерсанта»: просмотры выросли с 150–300 до 4 000+.",
        image: "/media/kommersant-logo.svg",
        alt: "Логотип газеты «Коммерсантъ»",
        imageKind: "logo",
        ratio: 500 / 150,
        links: [
          { label: "Было ↗", href: "https://www.kommersant.ru/doc/7325577?erid=F7NfYUJCUneP4VtcCdSp" },
          { label: "Стало ↗", href: "https://www.kommersant.ru/doc/7694230?erid=F7NfYUJCUneRJTwjy5aD&query=%d0%bf%d1%80%d0%be%d0%bc%d0%bc%d0%b0%d1%88+%d1%82%d0%b5%d1%81%d1%82" },
          { label: "Документ ↗", href: "https://docs.google.com/document/d/1XhQmbcGTu61mQ-cOjkZ1KZ9OnDGPEI8RVSBk2UFirlw/edit?tab=t.0" },
        ],
      },
      {
        number: "03",
        category: "Work with negative feedback",
        title: "Работа с отзывами: разбор ошибок, коммуникация с клиентами и ToV",
        text: "Пересобрал работу с негативными отзывами — от анализа ошибок до новых моделей ответов, ToV и командных сессий.",
        image: "/media/negative-reviews-client-communication-tov.png",
        alt: "Презентация стратегии работы с отзывами и клиентами",
        ratio: 3374 / 1922,
      },
      {
        number: "04",
        category: "Корпоративный мерч",
        title: "Корпоративная «Монополия»",
        text: "Разработал корпоративную игру для SERCONS: адаптировал «Монополию» под структуру и процессы компании для адаптации новых сотрудников и тимбилдинга.",
        image: "/media/sercons-corporate-monopoly.png",
        alt: "Корпоративная игра «Монополия» для SERCONS",
        ratio: 1,
      },
      {
        number: "05",
        category: "Корпоративный каталог",
        title: "Каталог «ПромМаш Тест»",
        text: "Разработал каталог испытательного центра «ПромМаш Тест»: показал экспертизу, лаборатории и оборудование в понятной печатной подаче.",
        image: "/media/prommash-test-corporate-catalog.png",
        alt: "Мокап корпоративного каталога испытательного центра «ПромМаш Тест»",
        ratio: 1374 / 1145,
      },
    ],
  },
  {
    number: "02",
    title: "Сайты и digital",
    projects: [
      {
        number: "01",
        category: "Digital",
        title: "Придумал, написал и вместе с командой превратил в сайт",
        text: "Превратил образовательную программу ПСБ «Предприниматика» для подростков в понятную digital-подачу.",
        image: "/media/psb-predprinimatika-program-landing.png",
        alt: "Лендинг образовательной программы Предприниматика для ПСБ",
        ratio: 1228 / 1624,
      },
      {
        number: "02",
        category: "Digital",
        title: "GEM EXPO + FEST + FORUM",
        text: "Упаковал международный рынок контента GEM Expo + Fest + Forum и его фестивальную программу в сайт.",
        image: "/media/yakutsk-expo-fest-forum-2025-landing.png",
        alt: "Страница GEM Expo Fest Forum в Якутске",
        ratio: 1118 / 1194,
      },
    ],
  },
  {
    number: "08",
    displayNumber: "03",
    title: "Редакционное сопровождение мероприятий",
    projects: [
      {
        number: "01",
        category: "Редакционное сопровождение",
        title: "ПромМаш Тест на выставке",
        text: "Сопровождал выставки и форумы — ПМЭФ, «Нефтегаз», ВНОТ, ADIPEC и другие: разрабатывал слоганы и теглайны, тексты стенда и переговорной зоны, навигацию и ключевые сообщения. Проводил редакционный контроль реализации застройки: проверял формулировки, цифры, названия и размещение материалов на носителях.",
        gallery: [
          {
            src: "/media/event-editorial-prommash-test-meeting-zone.png",
            alt: "Зона переговоров «ПромМаш Тест» на выставке",
            ratio: 1085 / 1449,
          },
          {
            src: "/media/event-editorial-prommash-test-exhibition-booth.png",
            alt: "Выставочный стенд «ПромМаш Тест»",
            ratio: 1086 / 1448,
          },
          {
            src: "/media/event-editorial-exhibition-build-out.png",
            alt: "Монтаж выставочного стенда",
            ratio: 1445 / 1089,
          },
        ],
      },
    ],
  },
  {
    number: "03",
    displayNumber: "04",
    title: "Личные бренды",
    projects: [
      {
        number: "01",
        category: "Личный бренд",
        title: "Бренд CEO (внутр. коммуникации)",
        text: "Собрал стратегию личного бренда Георгия Гаркуши: позиционирование, архетипы, ToV, контентные форматы и план продвижения.",
        image: "/media/georgy-garkusha-personal-brand-strategy.png",
        alt: "Презентация стратегии личного бренда Георгия Гаркуши",
        ratio: 3382 / 1564,
      },
      {
        number: "02",
        category: "Личный бренд",
        title: "Бренд CCO",
        text: "Разработал стратегию бренда Веры Горбачевой: сегментировал аудиторию, собрал ToV и moodboard с примерами коммуникации.",
        image: "/media/gorbacheva-personal-brand-tov-moodboard.png",
        alt: "Moodboard и примеры tone of voice для личного бренда",
        ratio: 3234 / 1748,
      },
      {
        number: "03",
        category: "Работай на нефть, работай!",
        title: "«Работай на нефть, работай!»",
        text: "Подготовил журнальное интервью о профессиональном пути Владимира Надеина: 65 лет в нефтегазовой отрасли, инженерный опыт и взгляд на безопасность.",
        wide: true,
        gallery: [
          {
            src: "/media/yubiley-neftegaz-interview-nadein-page-68.png",
            alt: "Интервью с Владимиром Надеиным в журнале «Юбилей», страница 68",
            ratio: 998 / 1484,
          },
          {
            src: "/media/yubiley-neftegaz-interview-nadein-page-69.png",
            alt: "Интервью с Владимиром Надеиным в журнале «Юбилей», страница 69",
            ratio: 992 / 1494,
          },
          {
            src: "/media/yubiley-neftegaz-interview-nadein-page-70.png",
            alt: "Интервью с Владимиром Надеиным в журнале «Юбилей», страница 70",
            ratio: 998 / 1438,
          },
          {
            src: "/media/yubiley-neftegaz-interview-nadein-page-71.png",
            alt: "Интервью с Владимиром Надеиным в журнале «Юбилей», страница 71",
            ratio: 1026 / 1460,
          },
          {
            src: "/media/yubiley-neftegaz-interview-nadein-page-72.png",
            alt: "Интервью с Владимиром Надеиным в журнале «Юбилей», страница 72",
            ratio: 1074 / 1594,
          },
        ],
      },
    ],
  },
  {
    number: "04",
    displayNumber: "05",
    title: "Стратегия и сценарии",
    projects: [
      {
        number: "01",
        category: "Content Strategy",
        title: "Контент-стратегия Hostman по системе SOSTAC",
        text: "Разработал и запустил контент-стратегию для Hostman по системе SOSTAC: определил аудитории и цели, собрал контентные направления, каналы и систему оценки результата.",
        image: "/media/hostman-logo.svg",
        alt: "Логотип Hostman",
        imageKind: "logo",
        ratio: 151 / 32,
      },
      {
        number: "02",
        category: "Creative Strategy",
        title: "SELLING SCENARIO",
        text: "Разработал продающий сценарий для интерьерного бренда: от аудитории и ключевого запроса до хуков, CTA и voice-over.",
        image: "/media/selling-scenario-architecture-interior.png",
        alt: "Selling Scenario: аудитория, хуки, CTA и voice-over для интерьерного бренда",
        ratio: 3400 / 1934,
      },
    ],
  },
  {
    number: "05",
    displayNumber: "06",
    title: "Видео и production",
    projects: [
      {
        number: "01",
        category: "Video Production",
        title: "Сценарии, storyboard, интервью, съёмки, постпродакшн",
        text: "Запустил видеонаправление для выставок и форумов: от сценария и раскадровки до съёмок и постпродакшна.",
        links: [
          { label: "Видео 01 ↗", href: "https://www.youtube.com/watch?v=TaJ63sbGwFE&t=52s" },
          { label: "Видео 02 ↗", href: "https://www.youtube.com/watch?v=coh1qFLm2vc&t=133s" },
          { label: "YouTube-канал ↗", href: "https://www.youtube.com/@sercons8699" },
        ],
        gallery: [
          {
            src: "/media/video-production-interview-on-site.png",
            alt: "Съёмка интервью на производстве",
            ratio: 1250 / 1784,
          },
          {
            src: "/media/video-production-factory-shoot.png",
            alt: "Съёмка видеоматериала на производстве",
            ratio: 1290 / 1766,
          },
          {
            src: "/media/video-production-studio-setup.png",
            alt: "Подготовка студии для видеосъёмки",
            ratio: 1252 / 1760,
          },
          {
            src: "/media/video-production-interview-studio.png",
            alt: "Съёмка интервью в офисном пространстве",
            ratio: 1080 / 1920,
          },
        ],
      },
    ],
  },
  {
    number: "06",
    displayNumber: "07",
    title: "B2C Travel: American Market",
    projects: [
      {
        number: "01",
        category: "B2C Travel: American Market",
        title: "Редакционная команда и контент-процесс",
        text: "Выстроил редакционный процесс B2C travel-медиа: стратегия, календарь, авторы, качество, ToV и публикации.",
        type: "text",
      },
    ],
  },
  {
    number: "07",
    displayNumber: "08",
    title: "Статьи на английском языке",
    projects: [
      {
        number: "01",
        category: "Medium",
        title: "Stop Writing Polite Replies. Start Fixing Problems.",
        text: "Разобрал, как превращать клиентские жалобы в конкретные решения, а не ограничиваться вежливыми ответами.",
        image: "/media/article-stop-writing-polite-replies-cover.png",
        alt: "Обложка статьи Stop Writing Polite Replies. Start Fixing Problems.",
        imageKind: "article-cover",
        ratio: 16 / 5,
        type: "link",
        href: "https://medium.com/@mmarkovvvv/stop-writing-polite-replies-start-fixing-problems-9d896f9f9620",
      },
      {
        number: "02",
        category: "Medium",
        title: "ATEX: The Explosion Hazard Sitting On Your Breakfast Table",
        text: "Объяснил на примере муки, почему ATEX-безопасность начинается с бытовых материалов.",
        image: "/media/article-atex-flour-cover.png",
        alt: "Обложка статьи ATEX: The Explosion Hazard Sitting On Your Breakfast Table",
        imageKind: "article-cover",
        ratio: 16 / 5,
        type: "link",
        href: "https://medium.com/@mmarkovvvv/the-explosion-hazard-sitting-on-your-breakfast-table-f907fb7bbba9",
        date: "15.07.2026",
        readTime: "5 min read",
      },
      {
        number: "03",
        category: "Medium",
        title: "Jerusalem: From a Divided Capital to an Eternal City",
        text: "Опубликовал исторический разбор превращения Иерусалима из разделённой столицы в вечный город.",
        image: "/media/article-jerusalem-from-divided-capital-to-eternal-city.png",
        alt: "Статья Jerusalem: From a Divided Capital to an Eternal City",
        ratio: 1406 / 1868,
      },
      {
        number: "04",
        category: "Medium",
        title: "To Boldly Go to San Diego Comic-Con International",
        text: "Написал репортаж о San Diego Comic-Con International и глобальной geek-культуре.",
        image: "/media/article-to-boldly-go-to-san-diego-comic-con-international.png",
        alt: "Статья To Boldly Go to San Diego Comic-Con International",
        imageKind: "article-cover",
        ratio: 1002 / 1380,
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Перейти к содержанию</a>
      <main id="main-content" tabIndex={-1}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="На главную">Михаил Марков</a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#projects">Работы</a>
          <a href="#about">Обо мне</a>
        </nav>
        <a className="header-contact" href="#contact">Контакты</a>
      </header>

      <section className="intro section-shell" id="top">
        <div className="intro-copy" id="about">
          <p className="kicker">Редактор</p>
          <h1>Михаил<br />Марков</h1>
          <p className="intro-text">
            {keepRussianWordsTogether("Редактор и руководитель контента и коммуникаций. 7+ лет работаю с текстами и контентом: от статей и digital-проектов до стратегий и видеопродакшна.")}
          </p>
          <div className="intro-links">
            <a href="#projects">Работы <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="contact contact-after-intro section-shell" id="contact">
        <span className="contact-label">Контакты</span>
        <div className="contact-list" aria-label="Контакты">
          <a className="contact-icon-link" href="mailto:mmarkovvvv@gmail.com" aria-label="Почта: mmarkovvvv@gmail.com">
            <ContactIcon kind="email" />
          </a>
          <a className="contact-icon-link" href="https://t.me/mmarkovvvv" target="_blank" rel="noreferrer" aria-label="Telegram">
            <ContactIcon kind="telegram" />
          </a>
          <a className="contact-icon-link" href="https://setka.ru/users/7435494b-c6ca-44c8-b190-539b1472018f" target="_blank" rel="noreferrer" aria-label="Setka">
            <ContactIcon kind="setka" />
          </a>
          <a className="contact-icon-link" href="https://medium.com/@mmarkovvvv" target="_blank" rel="noreferrer" aria-label="Medium">
            <ContactIcon kind="medium" />
          </a>
        </div>
      </section>

      <section className="projects section-shell" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <span>01</span>
          <h2 id="projects-title">Работы</h2>
        </div>
        <nav className="project-index" aria-label="Категории работ">
          {projectGroups.map((group) => (
            <a href={`#group-${group.number}`} key={group.number}>
              <span>{group.displayNumber ?? group.number}</span>
              <strong>{keepRussianWordsTogether(group.title)}</strong>
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
        <div className="project-groups">
          {projectGroups.map((group) => (
            <section className={`project-group ${group.number === "07" ? "project-group-english" : ""}`} data-group={group.number} key={group.number} aria-labelledby={`group-${group.number}`}>
              <div className="group-heading">
                <span>{group.displayNumber ?? group.number}</span>
                <h3 id={`group-${group.number}`}>{keepRussianWordsTogether(group.title)}</h3>
              </div>
              <div className="project-list">
                {group.projects.map((project) => (
                  <article className={`project ${project.image || project.gallery ? "project-has-visual" : ""} ${project.featured ? "project-featured" : ""} ${project.wide ? "project-wide" : ""} ${group.number === "05" ? "project-video" : ""} ${project.type === "text" ? "project-text" : ""} ${project.type === "link" ? "project-link-item" : ""}`} key={`${group.number}-${project.number}`}>
                    {project.gallery ? (
                      project.wide ? (
                        <MagazineReader
                          label={project.category}
                          projectNumber={project.number}
                          pages={project.gallery.map((image) => ({ ...image, thumbnailSrc: thumbnailPath(image.src) }))}
                        />
                      ) : (
                        <div className={`project-gallery ${group.number === "05" ? "video-gallery" : ""}`}>
                          {project.gallery.map((image, index) => (
                            <div className={`project-visual project-gallery-item ${group.number === "05" ? "video-gallery-item" : ""}`} style={{ aspectRatio: image.ratio }} key={image.src}>
                              <LightboxImage src={image.src} thumbnailSrc={thumbnailPath(image.src)} alt={image.alt} className="project-image-trigger" sizes="(max-width: 720px) 88vw, 14vw" />
                              <span className="project-number">{project.number} / {index + 1}</span>
                            </div>
                          ))}
                        </div>
                      )
                    ) : project.image ? (
                      <div className={`project-visual ${project.imageKind === "logo" ? "project-visual-logo" : ""} ${project.imageKind === "article-cover" ? "project-visual-article-cover" : ""}`} style={{ aspectRatio: project.ratio }}>
                        <LightboxImage src={project.image} thumbnailSrc={thumbnailPath(project.image)} alt={project.alt ?? ""} className="project-image-trigger" sizes="(max-width: 720px) 88vw, 43vw" />
                        <span className="project-number">{project.number}</span>
                      </div>
                    ) : null}
                    {project.type === "link" ? (
                      <a className="project-link-preview" href={project.href} target="_blank" rel="noreferrer">
                        <div className="project-link-topline">
                          <p className="project-category">{keepRussianWordsTogether(project.category)}</p>
                          <span className="project-arrow" aria-hidden="true">↗</span>
                        </div>
                        <h4>{keepRussianWordsTogether(project.title)}</h4>
                        <p>{keepRussianWordsTogether(project.text)}</p>
                        {project.date || project.readTime ? (
                          <span className="project-link-meta">{project.date}{project.date && project.readTime ? " · " : ""}{project.readTime}</span>
                        ) : null}
                      </a>
                    ) : (
                      <div className="project-copy">
                        <p className="project-category">{keepRussianWordsTogether(project.category)}</p>
                        <h4>{keepRussianWordsTogether(project.title)}</h4>
                        <p>{keepRussianWordsTogether(project.text)}</p>
                        {project.links?.length ? (
                          <div className="project-links" aria-label="Ссылки на материалы">
                            {project.links.map((link) => (
                              <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>Михаил Марков</span>
        <a href="#top">Наверх ↑</a>
      </footer>
      </main>
    </>
  );
}
