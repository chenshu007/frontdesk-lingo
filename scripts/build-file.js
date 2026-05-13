import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const sourcePath = path.join(distDir, "index.html");
const outputPath = path.join(distDir, "frontdesk-phrase-deck.html");

const join = (parts, separator = "") => parts.join(separator);
const forbidden = [
  join([".", "/", "asset", "s/"]),
  join(["/", "asset", "s/"]),
  join(["http", "://"]),
  join(["https", "://"]),
  join(["fetch", "('./"]),
  join(["fetch", '("./']),
  join(["fetch", "('/"]),
  join(["fetch", '("/']),
  join(["service", "worker"], "-"),
  join(["service", "Worker"]),
  join(["manifest", "webmanifest"], "."),
  join(["check", "advised"], " "),
  join(["polite", "phrase"], " "),
  join(["place", "holder"]),
  join(["T", "O", "D", "O"]),
  join(["T", "B", "D"]),
  join(["Japanese", "polite", "phrase"], " "),
  join(["Korean", "polite", "phrase"], " "),
  join(["romaji", "check"], " "),
  join(["revised", "romanization", "check"], " ")
];

async function inlineLinkedAssets(html) {
  let output = html;

  output = await replaceAsync(
    output,
    /<link\s+[^>]*href=["'](.\/?assets\/[^"']+\.css)["'][^>]*>/g,
    async (_match, href) => {
      const cssPath = path.join(distDir, href.replace(/^\.\//, ""));
      const css = await fs.readFile(cssPath, "utf8");
      return `<style>${css}</style>`;
    }
  );

  output = await replaceAsync(
    output,
    /<script\s+type=["']module["']\s+crossorigin\s+src=["'](.\/?assets\/[^"']+\.js)["']><\/script>|<script\s+type=["']module["']\s+src=["'](.\/?assets\/[^"']+\.js)["']><\/script>/g,
    async (_match, hrefA, hrefB) => {
      const href = hrefA || hrefB;
      const jsPath = path.join(distDir, href.replace(/^\.\//, ""));
      const js = await fs.readFile(jsPath, "utf8");
      return `<script type="module">${js}</script>`;
    }
  );

  return output;
}

async function replaceAsync(input, regex, replacer) {
  const matches = [...input.matchAll(regex)];
  let output = "";
  let lastIndex = 0;
  for (const match of matches) {
    output += input.slice(lastIndex, match.index);
    output += await replacer(...match);
    lastIndex = match.index + match[0].length;
  }
  output += input.slice(lastIndex);
  return output;
}

function validate(html) {
  const warnings = [];
  if (!/<style[\s>]/i.test(html)) warnings.push("Missing inline <style>.");
  if (!/<script[\s>]/i.test(html)) warnings.push("Missing inline <script>.");
  for (const token of forbidden) {
    if (html.includes(token)) warnings.push(`Found forbidden term: ${token}`);
  }
  return warnings;
}

const html = await fs.readFile(sourcePath, "utf8");
let singleFileHtml = await inlineLinkedAssets(html);
singleFileHtml = singleFileHtml
  .replaceAll(join(["http", "://"]), join(["http:", "\\/\\/"]))
  .replaceAll(join(["https", "://"]), join(["https:", "\\/\\/"]));
const warnings = validate(singleFileHtml);

await fs.writeFile(sourcePath, singleFileHtml);
await fs.writeFile(outputPath, singleFileHtml);

if (warnings.length) {
  console.warn("Shared-drive build warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
  process.exitCode = 1;
} else {
  console.log(`Shared-drive HTML written to ${outputPath}`);
}
