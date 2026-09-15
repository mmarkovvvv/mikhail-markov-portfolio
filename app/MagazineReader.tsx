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
  const [openPageIndex, setOpenPageIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const currentPage = openPageIndex === null ? null : pages[openPageIndex];

  useEffect(() => {
    if (currentPage === null) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPageIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage]);

  if (!pages.length) {
    return null;
  }

  const closeReader = () => {
    setOpenPageIndex(null);
  };

  return (
    <>
      <div className="magazine-reader">
        <div className="magazine-page-strip" aria-label={`${label}: страницы`}>
          {pages.map((page, index) => (
            <button className="magazine-page-trigger" type="button" onClick={() => setOpenPageIndex(index)} aria-label={`Открыть страницу ${index + 1}`} key={page.src}>
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
          <span>{label}</span>
          <span>Нажмите на страницу, чтобы прочитать</span>
        </div>
      </div>

      {currentPage ? (
        <div className="magazine-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeReader()}>
          <div className="magazine-reader-dialog" role="dialog" aria-modal="true" aria-label={`${label}, страница ${(openPageIndex ?? 0) + 1}`}>
            <div className="magazine-reader-topline">
              <span>{projectNumber} / {(openPageIndex ?? 0) + 1} · {label}</span>
              <button className="magazine-reader-close" type="button" onClick={closeReader} ref={closeButtonRef} aria-label="Закрыть страницу">×</button>
            </div>
            <div className="magazine-reader-stage">
              <div className="magazine-reader-page-frame" style={{ aspectRatio: currentPage.ratio }}>
                <Image
                  src={currentPage.src}
                  alt={currentPage.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 720px) 94vw, 760px"
                  className="portfolio-image"
                />
              </div>
            </div>
            <div className="magazine-reader-controls">
              <span>Страница {(openPageIndex ?? 0) + 1} из {pages.length}</span>
              <span>Esc — закрыть</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
