"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MagazinePage = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  ratio: number;
};

type MagazineReaderProps = {
  pages: MagazinePage[];
  projectNumber: string;
  label: string;
  downloadHref?: string;
  compact?: boolean;
};

export default function MagazineReader({ pages, projectNumber, label, downloadHref, compact = false }: MagazineReaderProps) {
  const [openPageIndex, setOpenPageIndex] = useState<number | null>(null);
  const [loadedPageSrc, setLoadedPageSrc] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const readerWasOpenRef = useRef(false);
  const isReaderOpen = openPageIndex !== null;
  const currentPage = openPageIndex === null ? null : pages[openPageIndex] ?? null;

  useEffect(() => {
    if (!isReaderOpen) {
      readerWasOpenRef.current = false;
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!readerWasOpenRef.current) {
      closeButtonRef.current?.focus();
      readerWasOpenRef.current = true;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPageIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLoadedPageSrc(null);
        setOpenPageIndex((pageIndex) => pageIndex === null ? pageIndex : Math.min(pageIndex + 1, pages.length - 1));
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLoadedPageSrc(null);
        setOpenPageIndex((pageIndex) => pageIndex === null ? pageIndex : Math.max(pageIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReaderOpen, pages.length]);

  if (!pages.length) {
    return null;
  }

  const closeReader = () => {
    setOpenPageIndex(null);
  };

  const openPage = (index: number) => {
    setLoadedPageSrc(null);
    setOpenPageIndex(index);
  };

  const changePage = (delta: number) => {
    setLoadedPageSrc(null);
    setOpenPageIndex((pageIndex) => pageIndex === null ? pageIndex : Math.max(0, Math.min(pageIndex + delta, pages.length - 1)));
  };

  return (
    <>
      <div className={`magazine-reader ${compact ? "magazine-reader-compact" : ""}`}>
        <div className="magazine-page-strip" role="group" aria-label={`${label}: страницы`}>
          {pages.map((page, index) => (
            <button className="magazine-page-trigger" type="button" onClick={() => openPage(index)} aria-label={`Открыть страницу ${index + 1}`} key={page.src}>
              <span className="magazine-page-paper" style={{ aspectRatio: page.ratio }}>
                <Image
                  src={page.thumbnailSrc ?? page.src}
                  alt={page.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 620px) 37vw, (max-width: 1100px) 17vw, 180px"
                  className="portfolio-image"
                />
                <span className="project-number">{projectNumber} / {index + 1}</span>
                <span className="magazine-page-open-hint" aria-hidden="true">Открыть ↗</span>
              </span>
            </button>
          ))}
        </div>
        <div className="magazine-strip-caption">
          <span>{pages.length} страниц</span>
          <span>Открыть страницы ↗</span>
          {downloadHref ? (
            <a className="magazine-download-link" href={downloadHref} target="_blank" rel="noreferrer">
              Скачать PDF ↗
            </a>
          ) : null}
        </div>
      </div>

      {currentPage ? (
        <div className="magazine-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeReader()}>
          <div className="magazine-reader-dialog" role="dialog" aria-modal="true" aria-label={`${label}, страница ${(openPageIndex ?? 0) + 1}`} aria-keyshortcuts="ArrowLeft ArrowRight Escape">
            <div className="magazine-reader-topline">
              <span>{projectNumber} / {(openPageIndex ?? 0) + 1} · {label}</span>
              <button className="magazine-reader-close" type="button" onClick={closeReader} ref={closeButtonRef} aria-label="Закрыть страницу">×</button>
            </div>
            <div className="magazine-reader-stage">
              <div className={`magazine-reader-page-frame ${loadedPageSrc === currentPage.src ? "" : "is-loading"}`} style={{ aspectRatio: currentPage.ratio }} aria-busy={loadedPageSrc !== currentPage.src}>
                <Image
                  key={currentPage.src}
                  src={currentPage.src}
                  alt={currentPage.alt}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 720px) 94vw, 760px"
                  className="portfolio-image"
                  onLoad={() => setLoadedPageSrc(currentPage.src)}
                />
                <span className="magazine-reader-loading" role="status">Загрузка страницы…</span>
              </div>
            </div>
            <div className="magazine-reader-controls">
              <div className="magazine-reader-page-nav">
                <button type="button" onClick={() => changePage(-1)} disabled={openPageIndex === 0} aria-label="Предыдущая страница">←</button>
                <span aria-live="polite">Страница {(openPageIndex ?? 0) + 1} из {pages.length}</span>
                <button type="button" onClick={() => changePage(1)} disabled={openPageIndex === pages.length - 1} aria-label="Следующая страница">→</button>
              </div>
              <span className="magazine-reader-hint">← → листать · Esc — закрыть</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
