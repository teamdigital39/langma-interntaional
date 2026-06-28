import { useEffect, useRef } from "react";

const IMAGE_SRCS = [
  "/images/ct5.jpeg",
  "/images/acc.jpeg",
  "/images/ez.jpeg",
  "/images/ymm.png",
  "/images/smm.png",
  "/images/clt6.webp",
  "/images/antt.jpg",
  "/images/army.jpg",
  "/images/cl21.jpg",
  "/images/cl22.jpg",
  "/images/cl23.jpg",
  "/images/cl24.jpg",
  "/images/cl25.jpg",
  // "/images/cl26.jpg",
  // "/images/cl27.jpg",
  "/images/cl28.jpg",
];

const splitIntoOrbits = (items, orbitCount) => {
  const perOrbit = Math.ceil(items.length / orbitCount);
  const groups = [];
  for (let i = 0; i < items.length; i += perOrbit) {
    groups.push(items.slice(i, i + perOrbit));
  }
  return groups;
};

const getLayout = (width, height) => {
  const minSide = Math.min(width, height);

  const centerSize = Math.round(
    Math.max(80, Math.min(210, minSide * 0.28))
  );
  const planetSize = Math.round(
    Math.max(48, Math.min(112, minSide * 0.135))
  );

  const orbitCount = width < 480 ? 1 : width < 820 ? 2 : 3;
  const padding = Math.max(10, minSide * 0.03);

  const maxRadius = minSide / 2 - planetSize / 2 - padding;
  const firstRadius = centerSize / 2 + planetSize / 2 + padding * 0.8;
  const orbitGap =
    orbitCount > 1 ? (maxRadius - firstRadius) / (orbitCount - 1) : 0;

  return { centerSize, planetSize, orbitCount, firstRadius, orbitGap, padding };
};

const ClientOrbit = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const angleRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });

    let running = true;
    let bgImg = null;
    let centerImg = null;
    let allImgs = [];
    let orbitImgs = [];
    let lastOrbitCount = 0;

    const updateOrbitGroups = (width, height) => {
      const { orbitCount } = getLayout(width, height);
      if (orbitCount !== lastOrbitCount) {
        orbitImgs = splitIntoOrbits(allImgs, orbitCount);
        lastOrbitCount = orbitCount;
      }
    };

    const drawContainedImage = (
      img,
      x,
      y,
      size,
      { counterAngle = 0, paddingRatio = 0.14, fallback = "#143c67" } = {}
    ) => {
      const r = size / 2;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.16)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      ctx.beginPath();
      ctx.arc(x, y, r - 0.5, 0, Math.PI * 2);
      ctx.clip();

      ctx.translate(x, y);
      ctx.rotate(-counterAngle);

      if (img) {
        const maxDim = size * (1 - paddingRatio * 2);
        const aspect = img.width / img.height;
        let drawW;
        let drawH;

        if (aspect >= 1) {
          drawW = maxDim;
          drawH = maxDim / aspect;
        } else {
          drawH = maxDim;
          drawW = maxDim * aspect;
        }

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      } else {
        ctx.fillStyle = fallback;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.07)";
      ctx.lineWidth = Math.max(1, size * 0.035);
      ctx.stroke();
    };

    const drawCenterHub = (img, x, y, size) => {
      const r = size / 2;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.22)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
      ctx.beginPath();
      ctx.arc(x, y, r + 3, 0, Math.PI * 2);
      ctx.strokeStyle = "#f8c23b";
      ctx.lineWidth = Math.max(3, size * 0.022);
      ctx.stroke();
      ctx.restore();

      drawContainedImage(img, x, y, size, { paddingRatio: 0.06 });
    };

    const draw = (time) => {
      if (!running) return;

      const delta = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 16.67, 2.5)
        : 1;
      lastTimeRef.current = time;

      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      updateOrbitGroups(W, H);
      const cx = W / 2;
      const cy = H / 2;

      const { centerSize, planetSize, firstRadius, orbitGap } = getLayout(W, H);
      const speed = W < 640 ? 0.22 : 0.3;

      ctx.clearRect(0, 0, W, H);

      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, W, H);
      } else {
        ctx.fillStyle = "#f5f8fb";
        ctx.fillRect(0, 0, W, H);
      }

      angleRef.current += speed * delta;

      orbitImgs.forEach((group, orbitIndex) => {
        const radius = firstRadius + orbitIndex * orbitGap;
        const direction = orbitIndex % 2 === 0 ? 1 : -1;
        const orbitSpeed = 1 - orbitIndex * 0.12;

        group.forEach((img, index) => {
          const angleDeg =
            direction * angleRef.current * orbitSpeed +
            (360 / group.length) * index;
          const angleRad = angleDeg * (Math.PI / 180);

          const x = cx + radius * Math.cos(angleRad);
          const y = cy + radius * Math.sin(angleRad);

          drawContainedImage(img, x, y, planetSize, {
            counterAngle: angleRad,
            paddingRatio: W < 480 ? 0.06 : 0.08,
          });
        });
      });

      drawCenterHub(centerImg, cx, cy, centerSize);

      rafRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = async () => {
      bgImg = await loadImage("/images/client.png");
      centerImg = await loadImage("/images/cts.png");
      allImgs = await Promise.all(IMAGE_SRCS.map(loadImage));

      updateOrbitGroups(
        canvas.clientWidth || 800,
        canvas.clientHeight || 600
      );

      resize();
      rafRef.current = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement);

    init();

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full mt-10 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl px-2 sm:px-0">
      <div
        className="
          relative w-full
          h-[460px]
          sm:h-[540px]
          md:h-[620px]
          lg:h-[721px]
          xl:h-[800px]
          max-w-7xl mx-auto
        "
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-label="Our clients orbit showcase"
        />
      </div>
    </div>
  );
};

export default ClientOrbit;
