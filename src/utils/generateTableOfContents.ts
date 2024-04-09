// Inspired by: https://github.com/withastro/starlight/blob/main/packages/starlight/utils/generateToC.ts
import type { MarkdownHeading } from "astro";

export interface TocElement extends MarkdownHeading {
  children: TocElement[];
}

interface TocOptions {
  maxHeadingLevel?: number | undefined;
  minHeadingLevel?: number | undefined;
}

/** Inject a ToC entry as deep in the tree as its `depth` property requires. */
function injectChild(items: TocElement[], item: TocElement): void {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    injectChild(lastItem.children, item);
    return;
  }
}

export function generateTableOfContents(
  headings: ReadonlyArray<MarkdownHeading>,
  { maxHeadingLevel = 4, minHeadingLevel = 2 }: TocOptions = {}
) {
  // ignore headings that are too small or too big (h1 or h5)
  const bodyHeadings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
  );
  const toc: Array<TocElement> = [];

  for (const heading of bodyHeadings)
    injectChild(toc, { ...heading, children: [] });

  return toc;
}
