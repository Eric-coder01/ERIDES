const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlDirectory = path.join(root, 'html');
const cssDirectory = path.join(root, 'css');
const htmlFiles = fs.readdirSync(htmlDirectory)
    .filter((name) => name.endsWith('.html'))
    .map((name) => path.join(htmlDirectory, name));
const errors = [];

function checkLocalReference(reference, sourceFile, label) {
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(reference)) return;
    const cleanReference = reference.split(/[?#]/)[0];
    if (!cleanReference) return;
    const localPath = path.resolve(path.dirname(sourceFile), cleanReference);
    if (!localPath.startsWith(root + path.sep) || !fs.existsSync(localPath)) {
        errors.push(`${path.relative(root, sourceFile)}: missing or invalid ${label} "${reference}"`);
    }
}

for (const file of htmlFiles) {
    const source = fs.readFileSync(file, 'utf8');
    const ids = [...source.matchAll(/\\bid=["']([^"']+)["']/g)].map((match) => match[1]);
    const seenIds = new Set();

    for (const id of ids) {
        if (seenIds.has(id)) errors.push(`${path.relative(root, file)}: duplicate id "${id}"`);
        seenIds.add(id);
    }

    const assetRefs = [...source.matchAll(/\\b(?:src|href)=["']([^"']+)["']/g)]
        .map((match) => match[1]);

    for (const reference of assetRefs) {
        checkLocalReference(reference, file, 'asset');
    }
}

if (fs.existsSync(cssDirectory)) {
    const cssFiles = fs.readdirSync(cssDirectory)
        .filter((name) => name.endsWith('.css'))
        .map((name) => path.join(cssDirectory, name));

    for (const file of cssFiles) {
        const source = fs.readFileSync(file, 'utf8');
        const references = [...source.matchAll(/url\\(\\s*["']?([^"'\\)]+)["']?\\s*\\)/gi)]
            .map((match) => match[1].trim());

        for (const reference of references) {
            checkLocalReference(reference, file, 'CSS asset');
        }
    }
}

if (errors.length) {
    console.error('Static-site checks failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`Static-site checks passed for ${htmlFiles.length} HTML pages and local CSS assets.`);
}
