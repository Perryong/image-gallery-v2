import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import ts from 'typescript';

test('temporary gallery loads all downloaded images without Firebase', async () => {
  const source = readFileSync(new URL('../src/lib/useFirebaseImages.ts', import.meta.url), 'utf8');
  const manifestPath = new URL('../src/lib/local-images.json', import.meta.url);
  assert.ok(existsSync(manifestPath), 'download manifest must exist');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText
    .replace(/import localImages from ['"]\.\/local-images.json['"];?/, `const localImages = ${JSON.stringify(manifest)};`)
    .replaceAll('import.meta.env.BASE_URL', JSON.stringify('/image-gallery-v2/'));
  assert.ok(!/from ['"](?:firebase|\.\/firebase|react)/.test(compiled), 'local mode must not require Firebase or network loading');
  const { useFirebaseImages } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
  const result = useFirebaseImages();
  assert.equal(result.loading, false);
  assert.equal(result.error, null);
  assert.equal(result.images.length, 160);
  for (const image of result.images) {
    assert.equal(image.fullSizeLink, `/image-gallery-v2/gallery/${encodeURIComponent(image.id)}`);
    assert.equal(image.thumbnailLink, image.fullSizeLink);
    const bytes = readFileSync(new URL(`../public/gallery/${encodeURIComponent(image.id)}`, import.meta.url));
    assert.ok(bytes.length > 0, `${image.id} must be downloaded`);
  }
});
