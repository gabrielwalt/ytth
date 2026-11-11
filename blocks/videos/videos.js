/**
 * Videos: a grid of video cards (cover image, play button, title, description). A Brightcove
 * video opens in a modal dialog: the player on top, the transcript below it with a link to
 * its PDF. Other videos (YouTube, share links) open in a new tab.
 *
 * Authoring: one row per video.
 * - cell 1: the thumbnail picture (optional)
 * - cell 2: the video link (its text is the title), optional description paragraphs and an
 *   optional link to the transcript PDF (offered in the dialog, next to the transcript)
 * - cell 3: the transcript text (optional), shown in the dialog under the player
 *
 * Nothing is requested from Brightcove before a visitor presses play. The dialog plays the
 * video right away (the visitor asked for it), closes with its button, Escape or a click
 * outside, stops the video when closed and returns focus to the card.
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

/** The transcript content: loose text (a cell without paragraphs) becomes a paragraph. */
function transcriptContent(cell) {
  const frag = document.createDocumentFragment();
  if ([...cell.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())) {
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    frag.append(p);
  } else {
    frag.append(...cell.childNodes);
  }
  return frag;
}

let dialog;

/** The page's one video dialog, built on first use. */
function getDialog() {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'videos-dialog';
  dialog.setAttribute('aria-labelledby', 'videos-dialog-title');
  dialog.innerHTML = `<div class="videos-dialog-inner">
    <div class="videos-dialog-head">
      <h2 class="videos-dialog-title" id="videos-dialog-title"></h2>
      <button type="button" class="videos-dialog-close" aria-label="Close video"></button>
    </div>
    <div class="videos-dialog-player"></div>
    <section class="videos-dialog-transcript" aria-labelledby="videos-dialog-transcript-title">
      <div class="videos-dialog-transcript-head">
        <h3 id="videos-dialog-transcript-title">Transcript</h3>
      </div>
      <div class="videos-dialog-transcript-body"></div>
    </section>
  </div>`;
  dialog.querySelector('.videos-dialog-close').addEventListener('click', () => dialog.close());
  // a click on the backdrop (outside the inner box) closes it
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  // closing stops the video
  dialog.addEventListener('close', () => {
    dialog.querySelector('.videos-dialog-player').replaceChildren();
    document.documentElement.classList.remove('videos-dialog-open');
  });
  document.body.append(dialog);
  return dialog;
}

function openVideo({
  ref, title, transcript, pdf,
}) {
  const d = getDialog();
  d.querySelector('.videos-dialog-title').textContent = title;
  const iframe = document.createElement('iframe');
  iframe.src = `${embedUrl(ref)}&autoplay=true`;
  iframe.title = `Video player: ${title}`;
  iframe.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  d.querySelector('.videos-dialog-player').replaceChildren(iframe);

  const section = d.querySelector('.videos-dialog-transcript');
  const head = section.querySelector('.videos-dialog-transcript-head');
  head.querySelector('a')?.remove();
  if (pdf) head.append(newTabLink(pdf, 'Download PDF', 'link-pdf videos-dialog-pdf'));
  const body = section.querySelector('.videos-dialog-transcript-body');
  body.replaceChildren(...(transcript ? [transcript.content.cloneNode(true)] : []));
  body.scrollTop = 0;
  section.hidden = !transcript && !pdf;
  if (!transcript && pdf) body.textContent = 'The transcript of this video is available as a PDF.';

  document.documentElement.classList.add('videos-dialog-open');
  d.showModal();
  d.querySelector('.videos-dialog-close').focus();
}

/**
 * The card's cover: the thumbnail and a labelled play button that opens the video dialog.
 */
function buildPlayer(ref, title, picture, details) {
  const media = document.createElement('div');
  media.className = 'videos-media';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'videos-facade';
  button.setAttribute('aria-label', `Play video: ${title}`);
  button.setAttribute('aria-haspopup', 'dialog');
  if (picture) button.append(picture);
  const icon = document.createElement('span');
  icon.className = 'videos-play';
  icon.setAttribute('aria-hidden', 'true');
  button.append(icon);
  button.addEventListener('pointerenter', preconnect, { once: true });
  button.addEventListener('focus', preconnect, { once: true });
  button.addEventListener('click', () => openVideo({ ref, title, ...details }));
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
    // the transcript waits in a template (not rendered) until its dialog opens
    let transcript = null;
    if (transcriptCell) {
      transcript = document.createElement('template');
      transcript.content.append(transcriptContent(transcriptCell));
    }

    const li = document.createElement('li');
    li.append(ref
      ? buildPlayer(ref, title, picture, { transcript, pdf: pdf?.href })
      : buildThumbLink(video.href, title, picture));

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
    // a video that doesn't play in the dialog keeps its transcript PDF as a link on the card
    if (!ref && pdf) {
      const p = document.createElement('p');
      p.className = 'videos-links';
      p.append(newTabLink(pdf.href, 'Download transcript (PDF)', 'link-pdf'));
      body.append(p);
    }

    li.append(body);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
