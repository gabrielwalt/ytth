/**
 * Videos: a grid of video cards. The current site's videos are Brightcove and YouTube
 * share links, so each card opens the video in a new tab (no embedded players).
 *
 * Authoring: one row per video.
 * - cell 1: the thumbnail picture (optional)
 * - cell 2: the video link (its text is the title), optional description paragraphs and
 *   an optional transcript link (a link to a PDF)
 * @param {Element} block The block
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

const isPdf = (a) => /\.pdf($|[?#&])/i.test(a.getAttribute('href') || '');

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const links = [...row.querySelectorAll('a[href]')];
    const video = links.find((a) => !isPdf(a));
    if (!video) return;
    const transcript = links.find(isPdf);
    const img = row.querySelector('img');
    const title = video.textContent.trim() || img?.alt || 'Watch the video';

    const li = document.createElement('li');
    const thumb = document.createElement('a');
    thumb.className = 'videos-thumb';
    thumb.href = video.href;
    thumb.target = '_blank';
    thumb.rel = 'noopener';
    thumb.setAttribute('aria-label', `${title} (video, opens in a new tab)`);
    if (img) thumb.append(createOptimizedPicture(img.src, '', false, [{ width: '640' }]));
    const play = document.createElement('span');
    play.className = 'videos-play';
    play.setAttribute('aria-hidden', 'true');
    thumb.append(play);

    const body = document.createElement('div');
    body.className = 'videos-body';
    const h = document.createElement('h3');
    const a = document.createElement('a');
    a.href = video.href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = title;
    h.append(a);
    body.append(h);
    row.querySelectorAll('p').forEach((p) => {
      if (p.contains(video) || (transcript && p.contains(transcript)) || !p.textContent.trim() || p.querySelector('picture')) return;
      body.append(p);
    });
    if (transcript) {
      const t = document.createElement('a');
      t.href = transcript.href;
      t.className = 'link-pdf';
      t.target = '_blank';
      t.rel = 'noopener';
      t.textContent = transcript.textContent.trim().replace(/\s+/g, ' ') || 'Read transcript';
      const p = document.createElement('p');
      p.className = 'videos-transcript';
      p.append(t);
      body.append(p);
    }
    li.append(thumb, body);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
