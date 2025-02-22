export function setupThemeSync(iframe: HTMLIFrameElement) {
  // Send theme updates to Storybook iframe
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && mutation.target instanceof HTMLElement) {
        const isDark = mutation.target.classList.contains('dark');
        iframe.contentWindow?.postMessage(
          { type: 'theme-change', theme: isDark ? 'dark' : 'light' },
          '*'
        );
      }
    });
  });

  // Start observing theme changes on html element
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => observer.disconnect();
} 