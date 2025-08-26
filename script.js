(function () {
  const orb = document.getElementById("revealOrb");
  const spot = document.getElementById("avatarSpot");
  const content = document.getElementById("content");
  const page = document.querySelector(".page");
  const body = document.body;

  if (!orb || !spot || !content || !page) return;

  const GAP = 24;
  let animating = false;
  let revealed = false;

  function sizeNum(el, prop) {
    return parseFloat(getComputedStyle(el)[prop]);
  }

  function positionAvatar() {
    const pageRect = page.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const avatarH = sizeNum(spot, "height");
    const topPx = contentRect.top - pageRect.top - GAP - avatarH;
    spot.style.top = `${Math.max(16, topPx)}px`;
  }

  function once(el, event, handler) {
    const fn = (e) => {
      el.removeEventListener(event, fn);
      handler(e);
    };
    el.addEventListener(event, fn);
  }

  function showAvatar() {
    if (animating || revealed) return;
    animating = true;

    positionAvatar();

    orb.classList.remove("pop-in");
    orb.classList.add("pulse-out");

    once(orb, "animationend", () => {
      orb.classList.remove("pulse-out");
      orb.style.visibility = "hidden";

      body.classList.add("revealed");
      spot.setAttribute("aria-hidden", "false");
      spot.classList.add("pop-in");

      once(spot, "animationend", () => {
        spot.classList.remove("pop-in");
        revealed = true;
        animating = false;
        orb.setAttribute("aria-pressed", "true");
      });
    });
  }

  function hideAvatar() {
    if (animating || !revealed) return;
    animating = true;

    spot.classList.remove("pop-in");
    spot.classList.add("pulse-out");

    once(spot, "animationend", () => {
      spot.classList.remove("pulse-out");
      spot.setAttribute("aria-hidden", "true");
      body.classList.remove("revealed");

      orb.style.visibility = "visible";
      orb.classList.add("pop-in");

      once(orb, "animationend", () => {
        orb.classList.remove("pop-in");
        revealed = false;
        animating = false;
        orb.setAttribute("aria-pressed", "false");
      });
    });
  }

  orb.addEventListener("click", showAvatar);
  spot.addEventListener("click", hideAvatar);

  window.addEventListener("load", positionAvatar);
  window.addEventListener("resize", positionAvatar);


  document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("contact-btn");
  if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const user = "marek";
      const domain = "stransky.dev";
      window.location.href = `mailto:${user}@${domain}`;
    });
  });
})();
