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
};

export default function MagazineReader({ pages, projectNumber, label }: MagazineReaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const currentPage = pages[pageIndex];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setPageIndex((current) => Math.max(0, current - 1));
      }

      if (event.key === "ArrowRight") {
        setPageIndex((current) => Math.min(pages.length - 1, current + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, pages.length]);

  if (!currentPage) {
    return null;
  }

  const openReader = () => {
    setPageIndex(0);
    setIsOpen(true);
  };

  const closeReader = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="magazine-reader">
        <button className="magazine-preview-trigger" type="button" onClick={openReader} aria-label="Открыть журнал и листать страницы">
          <span className="magazine-preview-paper">
            <Image
              src={pages[0].thumbnailSrc ?? pages[0].src}
              alt={pages[0].alt}
              fill
              unoptimized
              sizes="(max-width: 720px) 78vw, 360px"
              className="portfolio-image"
            />
            <span className="project-number">{projectNumber} / 1</span>
          </span>
          <span className="magazine-preview-caption">
            <span>Открыть журнал</span>
            <span>{pages.length} страниц ↗</span>
          </span>
        </button>
      </div>

      {isOpen ? (
        <div className="magazine-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeReader()}>
          <div className="magazine-reader-dialog" role="dialog" aria-modal="true" aria-label="Интервью в журнале">
            <div className="magazine-reader-topline">
              <span>{label}</span>
              <button className="magazine-reader-close" type="button" onClick={closeReader} ref={closeButtonRef} aria-label="Закрыть журнал">×</button>
            </div>
            <div className="magazine-reader-stage">
              <div className="magazine-reader-page-frame" key={currentPage.src} style={{ aspectRatio: currentPage.ratio }}>
                <Image
                  src={currentPage.src}
                  alt={currentPage.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 720px) 86vw, 520px"
                  className="portfolio-image"
                />
                <span className="project-number">{projectNumber} / {pageIndex + 1}</span>
              </div>
            </div>
            <div className="magazine-reader-controls">
              <button className="magazine-reader-nav-button" type="button" onClick={() => setPageIndex((current) => Math.max(0, current - 1))} disabled={pageIndex === 0} aria-label="Предыдущая страница">←</button>
              <span aria-live="polite">{pageIndex + 1} / {pages.length}</span>
              <button className="magazine-reader-nav-button" type="button" onClick={() => setPageIndex((current) => Math.min(pages.length - 1, current + 1))} disabled={pageIndex === pages.length - 1} aria-label="Следующая страница">→</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
