const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlDirectory = path.join(root, 'html');
const htmlFiles = fs.readdirSync(htmlDirectory)
    .filter((name) => name.endsWith('.html'))
    .map((name) => path.join(htmlDirectory, name));

const errors = [];

for (const file of htmlFiles) {
    const source = fs.readFileSync(file, 'utf8');
    const relativeFile = path.relative(root, file);

    const ids = [...source.matchAll(/\\bid=["']([^"']+)["']/g)].map((match) => match[1]);
    const seenIds = new Set();
    for (const id of ids) {
        if (seenIds.has(id)) errors.push(`${relativeFile}: duplicate id "${id}"`);
        seenIds.add(id);
    }

    const assetRefs = [...source.matchAll(/\\b(?:src|href)=["']([^"']+)["']/g)]
        .map((match) => match[1]);

    for (const reference of assetRefs) {
        if (/^(?:https?:|mailto:|tel:|#|javascript:)/i.test(reference)) continue;
        const localPath = path.resolve(path.dirname(file), reference.split(/[?#]/)[0]);
        if (!localPath.startsWith(root + path.sep) || !fs.existsSync(localPath)) {
            errors.push(`${relativeFile}: missing or invalid local asset "${reference}"`);
        }
    }
}

if (errors.length) {
    console.error('Static-site checks failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`Static-site checks passed for ${htmlFiles.length} HTML pages.`);
}
