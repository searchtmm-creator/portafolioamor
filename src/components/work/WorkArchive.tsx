"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { projects } from "@/src/content/projects";
import { PolaroidCard } from "./PolaroidCard";

gsap.registerPlugin(Draggable, useGSAP);

const STORAGE_KEY = "producer-desk:positions:v1";
type StoredPosition = { x: number; y: number };
type StoredPositions = Record<string, StoredPosition>;

const readStoredPositions = (): StoredPositions => {
  try {
    const saved =
      localStorage.getItem(STORAGE_KEY) ??
      sessionStorage.getItem(STORAGE_KEY) ??
      "{}";
    return JSON.parse(saved) as StoredPositions;
  } catch {
    return {};
  }
};

const saveStoredPositions = (positions: StoredPositions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }
};

export function WorkArchive() {
  const scope = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const dragResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!scope.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-polaroid]",
        scope.current,
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const canDrag = window.matchMedia("(min-width: 721px)").matches;

      const stored = readStoredPositions();

      cards.forEach((card) => {
        const slug = card.dataset.slug ?? "";
        const position = stored[slug];
        if (position) gsap.set(card, position);
      });

      if (!reducedMotion) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: "+=18", rotate: "+=1.5" },
          {
            opacity: 1,
            y: (index, element) =>
              stored[(element as HTMLElement).dataset.slug ?? ""]?.y ?? 0,
            rotate: "-=1.5",
            duration: 0.55,
            stagger: 0.025,
            ease: "power2.out",
            clearProps: "opacity",
          },
        );
      }

      if (!canDrag) return;

      const instances = Draggable.create(cards, {
        type: "x,y",
        bounds: scope.current,
        minimumMovement: 7,
        dragClickables: true,
        onPress(this: Draggable) {
          dragged.current = false;
          gsap.set(this.target, { zIndex: 60, scale: 1.04 });
        },
        onDragStart() {
          dragged.current = true;
        },
        onDragEnd(this: Draggable) {
          const card = this.target as HTMLElement;
          const slug = card.dataset.slug ?? "";
          const current = readStoredPositions();
          current[slug] = { x: this.x, y: this.y };
          saveStoredPositions(current);
          gsap.to(card, {
            scale: 1,
            duration: reducedMotion ? 0 : 0.18,
            ease: "power2.out",
          });
          if (dragResetTimer.current) clearTimeout(dragResetTimer.current);
          dragResetTimer.current = setTimeout(() => {
            dragged.current = false;
          }, 80);
        },
        onRelease(this: Draggable) {
          if (!this.isDragging)
            gsap.to(this.target, { scale: 1, duration: 0.14 });
        },
      });

      const updateBounds = () =>
        instances.forEach((instance) => instance.applyBounds(scope.current));
      window.addEventListener("resize", updateBounds, { passive: true });
      return () => {
        window.removeEventListener("resize", updateBounds);
        instances.forEach((instance) => instance.kill());
        if (dragResetTimer.current) clearTimeout(dragResetTimer.current);
      };
    },
    { scope },
  );

  const resetLayout = contextSafe(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // The visual reset still works when browser storage is unavailable.
    }
    dragged.current = false;
    gsap.to("[data-polaroid]", {
      x: 0,
      y: 0,
      scale: 1,
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : 0.45,
      stagger: 0.015,
      ease: "power3.out",
    });
  });

  return (
    <section className="archive-section" aria-labelledby="archive-title">
      <div className="archive-intro">
        <div className="archive-composition">
          <p className="eyebrow">Welcome to my work collection</p>
          <h1 id="archive-title">
            <span className="archive-word archive-word--ideas">ideas</span>
            <em className="archive-word archive-word--made">made</em>
            <span className="archive-word archive-word--real">real.</span>
          </h1>
          <p className="archive-claim">Producing work people remember.</p>
        </div>
      </div>
      <div className="archive-board" id="work-board" ref={scope}>
        <div className="drag-note" aria-hidden="true">
          <span>drag to explore</span>
        </div>
        <button
          className="reset-layout"
          type="button"
          onClick={resetLayout}
          data-testid="reset-layout"
        >
          reset layout
        </button>
        <p className="sr-only">
          Sixteen project links. On desktop, cards may also be rearranged by
          dragging.
        </p>
        {projects.map((item, index) => (
          <PolaroidCard
            key={item.slug}
            project={item}
            index={index}
            wasDragged={() => dragged.current}
          />
        ))}
        <div className="archive-scribbles" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <span key={index}>✳</span>
          ))}
        </div>
      </div>
    </section>
  );
}
