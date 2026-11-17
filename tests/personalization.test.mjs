import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';

const html = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('home page identifies the blog and author in Chinese', () => {
  const home = html('index.html');
  assert.match(home, /<html lang="zh-CN"/);
  assert.match(home, /<title>澜海Blog - 个人博客 · 记录学习与思考<\/title>/);
  assert.match(home, /蓝海上将/);
  assert.match(home, /一名热爱技术与创造的大学生，专注于 Web 开发与开源。/);
  assert.match(home, /https:\/\/github\.com\/zlg233/);
  assert.match(home, /<meta property="og:url" content="https:\/\/lgweb\.top\/">/);
  assert.doesNotMatch(home, /Lorem Ipsum|twitter\.com|store\.steampowered\.com/);
});

test('about page shows approved public details and project', () => {
  const about = html('about/index.html');
  for (const detail of ['汕头大学', '数据科学与大数据技术', '本科', 'zhanglange@foxmail.com', 'https://lgweb.top']) {
    assert.ok(about.includes(detail), `Missing public detail: ${detail}`);
  }
  assert.doesNotMatch(about, /This is the demo site for/);
});

test('example articles remain available', () => {
  for (const slug of ['guide', 'markdown', 'markdown-extended', 'expressive-code', 'video']) {
    assert.ok(existsSync(new URL(`../dist/posts/${slug}/index.html`, import.meta.url)), `Missing example: ${slug}`);
  }
});
