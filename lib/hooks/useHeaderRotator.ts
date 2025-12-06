import { useEffect } from "react";

export default function useHeaderRotator() {
  useEffect(() => {
    try {
      const header = document.querySelector("header.flex") as HTMLElement;
      if (!header) return;

      const attr = header.getAttribute("data-images");
      if (!attr) return;

      const urls = attr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (urls.length < 2) return;

      const intervalAttr = parseInt(
        header.getAttribute("data-interval") || "2000",
        10
      );
      const intervalMs =
        Number.isFinite(intervalAttr) && intervalAttr > 0 ? intervalAttr : 2000;
      const gradient =
        "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))";

      header.classList.add("header-rotator", "show-a", "kb-a");

      urls.forEach((u) => {
        const img = new Image();
        img.src = u.replace(/^url\((.*)\)$/, "$1").replace(/^"|"$/g, "");
      });

      const setVar = (name: string, url: string) => {
        const clean = url.startsWith("url(") ? url : `url("${url}")`;
        header.style.setProperty(name, clean);
      };

      let index = 0;
      setVar("--rot-img-a", urls[index]);
      setVar("--rot-img-b", urls[(index + 1) % urls.length]);
      let showingA = true;
      header.style.backgroundImage = `${gradient}, url("${urls[index]}")`;

      function updateDots(activeIdx: number) {
        if (!dots.length) return;
        dots.forEach((d, i) => {
          if (i === activeIdx) {
            d.classList.add("active");
            d.setAttribute("aria-selected", "true");
          } else {
            d.classList.remove("active");
            d.setAttribute("aria-selected", "false");
          }
        });
      }

      function goTo(targetIndex: number) {
        if (targetIndex === index) return;
        const nextUrl = urls[targetIndex];
        if (showingA) {
          setVar("--rot-img-b", nextUrl);
          header.classList.remove("show-a");
          header.classList.add("show-b");
          header.classList.remove("kb-a");
          void header.offsetWidth;
          header.classList.add("kb-b");
        } else {
          setVar("--rot-img-a", nextUrl);
          header.classList.remove("show-b");
          header.classList.add("show-a");
          header.classList.remove("kb-b");
          void header.offsetWidth;
          header.classList.add("kb-a");
        }
        showingA = !showingA;
        index = targetIndex;
        header.style.backgroundImage = `${gradient}, url("${nextUrl}")`;
        updateDots(index);
      }

      const dotsWrap = header.querySelector(".header-dots");
      const dots: HTMLButtonElement[] = [];
      if (dotsWrap) {
        dotsWrap.innerHTML = "";
        urls.forEach((_, i) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "header-dot" + (i === index ? " active" : "");
          dot.setAttribute("aria-label", `Show slide ${i + 1}`);
          dot.setAttribute("role", "tab");
          dot.setAttribute("aria-selected", i === index ? "true" : "false");
          dot.addEventListener("click", () => {
            goTo(i);
          });
          dotsWrap.appendChild(dot);
          dots.push(dot);
        });
      }

      const tick = () => {
        index = (index + 1) % urls.length;
        const nextUrl = urls[index];
        if (showingA) {
          setVar("--rot-img-b", nextUrl);
          header.classList.remove("show-a");
          header.classList.add("show-b");
          header.classList.remove("kb-a");
          void header.offsetWidth;
          header.classList.add("kb-b");
        } else {
          setVar("--rot-img-a", nextUrl);
          header.classList.remove("show-b");
          header.classList.add("show-a");
          header.classList.remove("kb-b");
          void header.offsetWidth;
          header.classList.add("kb-a");
        }
        showingA = !showingA;
        header.style.backgroundImage = `${gradient}, url("${nextUrl}")`;
        updateDots(index);
      };

      header.style.setProperty("--rot-dur", `${intervalMs}ms`);
      const timer = setInterval(tick, intervalMs);

      return () => {
        clearInterval(timer);
      };
    } catch {
      // silent
    }
  }, []);
}
