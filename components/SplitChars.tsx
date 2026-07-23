/**
 * Walks an element's DOM tree and wraps every individual character of every
 * text node in its own <span class="char">. Existing element wrappers
 * (e.g. colored <span> tags used for syntax highlighting) are preserved —
 * only the raw text nodes inside them are split, so highlight colors are
 * untouched.
 *
 * Returns the list of created char spans in document order, so callers can
 * stagger-animate them without needing to re-query the DOM.
 *
 * Idempotent: calling it twice on the same element is a no-op the second
 * time (checks a data-split flag), which matters because React StrictMode
 * double-invokes effects in dev.
 */
export function splitChars(root: HTMLElement): HTMLSpanElement[] {
  if (root.dataset.split === "true") {
    return Array.from(root.querySelectorAll<HTMLSpanElement>(".char"));
  }
  root.dataset.split = "true";

  const chars: HTMLSpanElement[] = [];

  // Snapshot text nodes first — mutating while walking a live tree is unsafe.
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent && node.textContent.length > 0) {
      textNodes.push(node as Text);
    }
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentNode;
    if (!parent) continue;
    const frag = document.createDocumentFragment();

    for (const ch of textNode.textContent ?? "") {
      if (ch === "\n") {
        frag.appendChild(document.createElement("br"));
        continue;
      }
      const span = document.createElement("span");
      span.className = "char";
      span.style.display = "inline-block";
      span.style.whiteSpace = ch === " " ? "pre" : "normal";
      span.textContent = ch;
      frag.appendChild(span);
      chars.push(span);
    }
    parent.replaceChild(frag, textNode);
  }

  return chars;
}