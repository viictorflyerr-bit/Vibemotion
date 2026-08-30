"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MIN_CURSOR_WIDTH = 768;
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="interactive"], input[type="submit"], input[type="button"]';
const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

function canUseCustomCursor() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.innerWidth >= MIN_CURSOR_WIDTH &&
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor || !canUseCustomCursor()) {
      return;
    }

    let active = false;
    let visible = false;
    let textMode = false;
    let interactiveMode = false;

    const ctx = gsap.context(() => {
      gsap.set(cursor, {
        autoAlpha: 0,
        display: "block",
        scale: 1,
        x: -100,
        y: -100,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });
    }, cursor);

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.1,
      ease: "power3.out",
    });

    const showCursor = () => {
      if (!active || visible || textMode) {
        return;
      }

      visible = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0.12, ease: "power2.out" });
    };

    const hideCursor = () => {
      if (!visible) {
        return;
      }

      visible = false;
      gsap.to(cursor, { autoAlpha: 0, duration: 0.12, ease: "power2.out" });
    };

    const setInteractive = (nextInteractive: boolean) => {
      if (interactiveMode === nextInteractive) {
        return;
      }

      interactiveMode = nextInteractive;
      cursor.classList.toggle("custom-cursor--interactive", nextInteractive);
      gsap.to(cursor, {
        scale: nextInteractive ? 1.18 : 1,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);

      const target =
        event.target instanceof Element ? event.target : undefined;
      const nextTextMode = Boolean(target?.closest(TEXT_SELECTOR));

      if (nextTextMode) {
        textMode = true;
        setInteractive(false);
        hideCursor();
        return;
      }

      if (textMode) {
        textMode = false;
      }

      setInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
      showCursor();
    };

    const handleLeave = () => {
      hideCursor();
    };

    const handleEnter = () => {
      if (!textMode) {
        showCursor();
      }
    };

    const activate = () => {
      if (active || !canUseCustomCursor()) {
        return;
      }

      active = true;
      document.body.classList.add("custom-cursor-active");
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("blur", handleLeave);
      window.addEventListener("focus", handleEnter);
      document.documentElement.addEventListener("mouseleave", handleLeave);
      document.documentElement.addEventListener("mouseenter", handleEnter);
    };

    const deactivate = () => {
      active = false;
      visible = false;
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handleLeave);
      window.removeEventListener("focus", handleEnter);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      gsap.killTweensOf(cursor);
      gsap.set(cursor, { autoAlpha: 0 });
    };

    activate();

    return () => {
      deactivate();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-cursor"
    />
  );
}
