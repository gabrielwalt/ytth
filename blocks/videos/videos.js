/**
 * Videos: a grid of videos. Brightcove videos play in the page behind a click-to-load facade;
 * other videos (YouTube, share links) open in a new tab.
 *
 * Authoring: one row per video.
 * - cell 1: the thumbnail picture (optional)
 * - cell 2: the video link (its text is the title), optional description paragraphs and an
 *   optional link to the transcript PDF
 * - cell 3: the transcript text (optional), shown as a "Transcript: {title}" disclosure
 *
 * Brightcove links: https://players.brightcove.net/{account}/{player}_default/index.html?videoId={id}
 * or the Player Pages form …/pages/v1/index.html?accountId=…&playerId=…&videoId=…
 * @param {Element} block The block
 */
import { createOptimizedPicture, toClassName } from '../../scripts/aem.js';
import { isPdfUrl } from '../../scripts/scripts.js';

const BRIGHTCOVE_ORIGIN = 'https://players.brightcove.net';

/**
 * Reads account, player and video id from a Brightcove player URL.
 * @param {string} href The link
 * @returns {{account: string, player: string, embed: string, id: string}|null}
 */
export function parseBrightcove(href) {
  let url;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== BRIGHTCOVE_ORIGIN) return null;
  const valid = (v) => v && /^[\w-]+$/.test(v);
  const m = url.pathname.match(/^\/(\d+)\/([\w-]+?)_(\w+)\/index\.html$/);
  const ref = m
    ? {
      account: m[1], player: m[2], embed: m[3], id: url.searchParams.get('videoId'),
    }
    : {
      account: url.searchParams.get('accountId'),
      player: url.searchParams.get('playerId'),
      embed: 'default',
      id: url.searchParams.get('videoId'),
    };
  if (!/^\d+$/.test(ref.account || '') || !valid(ref.player) || !valid(ref.embed) || !/^\d+$/.test(ref.id || '')) return null;
  return ref;
}

const embedUrl = ({
  account, player, embed, id,
}) => `${BRIGHTCOVE_ORIGIN}/${account}/${player}_${embed}/index.html?videoId=${id}`;

// consent hook: scripts/consent-check.js announces the visitor's choice with a `consent.update`
// event. Nothing is requested from Brightcove before a visitor presses play; with consent, the
// connection is warmed up when the pointer or focus reaches a player.
let consented = false;
window.addEventListener('consent.update', (e) => { consented = !!e.detail?.consented; });
let preconnected = false;
function preconnect() {
  if (!consented || preconnected) return;
  preconnected = true;
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = BRIGHTCOVE_ORIGIN;
  document.head.append(link);
}

function newTabLink(href, text, className) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  if (className) a.className = className;
  a.append(text);
  const hint = document.createElement('span');
  hint.className = 'visually-hidden';
  hint.textContent = className === 'link-pdf' && !/pdf/i.test(text) ? ' (PDF, opens in a new tab)' : ' (opens in a new tab)';
  a.append(hint);
  return a;
}

function uniqueId(base) {
  let id = base || 'video';
  let n = 2;
  while (document.getElementById(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  return id;
}

/**
 * The facade: the thumbnail and a labelled play button. On activation it is replaced by the
 * player iframe in the same 16:9 box, so nothing shifts.
 */
function buildPlayer(ref, title, picture) {
  const media = document.createElement('div');
  media.className = 'videos-media';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'videos-facade';
  button.setAttribute('aria-label', `Play video: ${title}`);
  if (picture) button.append(picture);
  const icon = document.createElement('span');
  icon.className = 'videos-play';
  icon.setAttribute('aria-hidden', 'true');
  button.append(icon);
  button.addEventListener('pointerenter', preconnect, { once: true });
  button.addEventListener('focus', preconnect, { once: true });
  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl(ref);
    iframe.title = `Video player: ${title}`;
    iframe.allow = 'fullscreen; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    button.replaceWith(iframe);
    iframe.focus();
  });
  media.append(button);
  return media;
}

/** The thumbnail as a link that opens a non-Brightcove video in a new tab. */
function buildThumbLink(href, title, picture) {
  const thumb = newTabLink(href, '', 'videos-media videos-thumb');
  thumb.querySelector('.visually-hidden').remove();
  thumb.setAttribute('aria-label', `${title} (video, opens in a new tab)`);
  if (picture) thumb.append(picture);
  const play = document.createElement('span');
  play.className = 'videos-play';
  play.setAttribute('aria-hidden', 'true');
  thumb.append(play);
  return thumb;
}

function buildTranscript(cell, title) {
  const details = document.createElement('details');
  details.className = 'videos-transcript';
  const summary = document.createElement('summary');
  summary.textContent = `Transcript: ${title}`;
  const body = document.createElement('div');
  body.className = 'videos-transcript-body';
  // loose text (a cell without paragraphs) becomes a paragraph
  if ([...cell.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())) {
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    body.append(p);
  } else {
    body.append(...cell.childNodes);
  }
  details.append(summary, body);
  return details;
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const links = [...row.querySelectorAll('a[href]')];
    const video = links.find((a) => !isPdfUrl(a.href));
    if (!video) return;
    const videoCell = cells.find((c) => c.contains(video)) || row;
    const transcriptCell = cells.slice(cells.indexOf(videoCell) + 1)
      .find((c) => c.textContent.trim() && !c.querySelector('picture'));
    const pdf = links.find((a) => isPdfUrl(a.href));
    // a transcript PDF link authored in the transcript cell moves to the links line
    if (pdf && transcriptCell?.contains(pdf)) {
      const p = pdf.closest('p');
      if (p && p.textContent.trim() === pdf.textContent.trim()) p.remove();
    }
    const img = [...row.querySelectorAll('img')].find((i) => !transcriptCell?.contains(i));
    const title = video.textContent.trim() || img?.alt || 'Video';
    const picture = img ? createOptimizedPicture(img.src, '', false, [{ width: '750' }]) : null;
    const ref = parseBrightcove(video.href);

    const li = document.createElement('li');
    li.append(ref ? buildPlayer(ref, title, picture) : buildThumbLink(video.href, title, picture));

    const body = document.createElement('div');
    body.className = 'videos-body';
    const h = document.createElement('h3');
    h.id = uniqueId(toClassName(title));
    if (ref) h.textContent = title;
    else h.append(newTabLink(video.href, title));
    body.append(h);
    videoCell.querySelectorAll(':scope > p, :scope > ul, :scope > ol').forEach((el) => {
      if (el.contains(video) || (pdf && el.contains(pdf)) || !el.textContent.trim() || el.querySelector('picture')) return;
      body.append(el);
    });

    const actions = document.createElement('p');
    actions.className = 'videos-links';
    if (ref) actions.append(newTabLink(embedUrl(ref), 'Watch on Brightcove', 'link-external'));
    if (pdf) {
      const text = pdf.textContent.trim().replace(/\s+/g, ' ');
      actions.append(newTabLink(pdf.href, /transcript/i.test(text) ? text : 'Download transcript (PDF)', 'link-pdf'));
    }
    if (transcriptCell) body.append(buildTranscript(transcriptCell, title));
    if (actions.children.length) body.append(actions);

    li.append(body);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
