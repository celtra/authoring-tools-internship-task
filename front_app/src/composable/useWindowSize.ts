import { ref, computed, onMounted, onUnmounted } from "vue";

export function useWindowSize() {
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);

  const size = computed(() => {
    const calculatedSize =
      windowHeight.value > windowWidth.value
        ? windowWidth.value * 0.8
        : windowHeight.value * 0.8;

    if (windowWidth.value < 450) {
      return Math.min(calculatedSize, 300);
    }
    if (windowWidth.value < 600) {
      return Math.min(calculatedSize, 400);
    }
    if (windowWidth.value < 1450) {
      return 480;
    }
    if (windowWidth.value < 1500) {
      return Math.min(calculatedSize, 600);
    }
    return Math.min(calculatedSize, 700);
  });

  const updateSize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", updateSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
  });

  return {
    windowWidth,
    windowHeight,
    size,
  };
}
