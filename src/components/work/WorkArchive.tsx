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

      let stored: StoredPositions = {};
      try {
        stored = JSON.parse(
          sessionStorage.getItem(STORAGE_KEY) ?? "{}",
        ) as StoredPositions;
      } catch {
        stored = {};
      }

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
          let current: StoredPositions = {};
          try {
            current = JSON.parse(
              sessionStorage.getItem(STORAGE_KEY) ?? "{}",
            ) as StoredPositions;
          } catch {
            current = {};
          }
          current[slug] = { x: this.x, y: this.y };
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
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
    sessionStorage.removeItem(STORAGE_KEY);
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
        <p className="eyebrow">the producer&apos;s desk · selected work</p>
        <h1 id="archive-title">
          <span>ideas</span>
          <em>made</em>
          <span>real.</span>
        </h1>
        <p className="archive-claim">Producing ideas people remember.</p>
        <div className="drag-note" aria-hidden="true">
          drag the work <span>↘</span>
        </div>
      </div>
      <div className="archive-toolbar">
        <p>16 pieces · 5 films attached</p>
        <button type="button" onClick={resetLayout} data-testid="reset-layout">
          reset layout
        </button>
      </div>
      <div className="archive-board" ref={scope}>
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
        <span
          className="archive-scribble archive-scribble--one"
          aria-hidden="true"
        >
          ✳
        </span>
        <span
          className="archive-scribble archive-scribble--two"
          aria-hidden="true"
        >
          production / people / pictures
        </span>
      </div>
    </section>
  );
}
