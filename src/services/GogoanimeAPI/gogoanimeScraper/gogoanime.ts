/**
 * Initial @author Gyanendro Kh <https://gyanendrokh.github.io>
 */

import axios from 'axios';
import {
  GogoEntity,
  GogoEntityBasic,
  GogoPagination,
  GogoRecentRelease,
  IAnime,
  IAnimeEpisodeInfo,
  IEpisodePage,
} from '../../../utils/interfaces';
import { getIdFromPath } from './utils';

const cheerio = require('react-native-cheerio')

export class GoGoAnime {
  private readonly baseUrl: string;
  private readonly apiBaseUrl: string;
  private readonly videoApiUrl: string;

  constructor() {
    this.baseUrl = 'https://gogoanime.ai';
    this.apiBaseUrl = 'https://ajax.gogo-load.com';
    this.videoApiUrl = 'https://streamani.net/streaming.php';
  }

  getVideoApiUrl = ()  => {
    return this.videoApiUrl
  }

  async recentRelease(
    page?: number,
    type?: number,
  ): Promise<GogoPagination<GogoRecentRelease>> {
    const res = await axios.get(
      this.getUrlWithApi('/ajax/page-recent-release.html'),
      {
        params: {
          page, type
        }
      }
    );
    const $ = cheerio.load(res.data);

    const paginations = new Array<number>();
    const series = new Array<GogoRecentRelease>();

    $(
      'div.anime_name_pagination.intro div.pagination.recent ul.pagination-list li'
    ).each((_: any, ele: any) => {
      const a = $(ele).children('a');

      const number = a.data('page');

      paginations.push(number);
    });

    $('div.last_episodes.loaddub ul.items li').each((_: any, ele: any) => {
      const a = $(ele).find('p.name a');

      const thumbnail = $(ele).find('div.img a img').attr('src') ?? '';
      const episode = $(ele).find('p.episode').text().trim();

      series.push({
        ...this._getEntityFromA(a),
        thumbnail,
        episode
      });
    });

    return {
      page: page ?? 1,
      paginations,
      data: series
    };
  }

  async searchAjax(
    keyword: string
  ): Promise<Array<GogoEntity>> {
    const res = await axios.get<{ content: string }>(
      this.getUrlWithApi('/site/loadAjaxSearch'),
      {
        params: { keyword }
      }
    );
    const content = res.data.content.replace(/\\/g, '');
    const $ = cheerio.load(content);

    const animes = new Array<GogoEntity>();

    $(
      'div#header_search_autocomplete_body div#header_search_autocomplete_item_'
    ).each((_: any, ele: any) => {
      const a = $(ele).children('a');

      const { id, link } = this._getEntityFromA(a);

      const style = a.children('div.thumbnail-recent_search').attr('style');
      const thumbnail = (() => {
        const match = (style ?? '').match(/url\("(?<url>.+)"\)/);

        if (match && match.groups) {
          const url = match.groups['url'];

          if (url) {
            return url;
          }
        }

        return '';
      })();

      const title = a.text();

      animes.push({ id, link, title, thumbnail });
    });

    return animes;
  }

  async animeEpisodes(
    movieId: string,
    start: number,
    end: number
  ): Promise<Array<GogoEntityBasic>> {
    const res = await axios.get(
      this.getUrlWithApi('/ajax/load-list-episode'),
      {
        params: {
          id: movieId,
          default_ep: 0,
          ep_start: start,
          ep_end: end
        }
      }
    );
    const $ = cheerio.load(res.data);

    const episodes = new Array<GogoEntityBasic>();

    $('ul#episode_related li').each((_: any, ele: any) => {
      const a = $(ele).children('a');

      const title = a.children('.name').text().trim();

      episodes.push({ ...this._getEntityFromA(a), title });
    });

    return episodes;
  }

  async animeEpisodeInfo(
    id: string
  ): Promise<IAnimeEpisodeInfo> {
    const link = this.getUrlWithBase(`/${id}`);
    const res = await axios.get(link);
    const $ = cheerio.load(res.data);

    const anime = this._getEntityFromA(
      $('div.anime_video_body div.anime_video_body_cate div.anime-info a')
    );
    const movieId =
      $('input[type="hidden"]#movie_id.movie_id').attr('value') ?? '';
    const episode = Number(
      $('input[type="hidden"]#default_ep.default_ep').attr('value') ?? '-1'
    );

    const src = $('.play-video iframe').attr('src') ?? '';

    const videoId = (() => {
      const matches = src.match(/id=(?<id>\w+)/);

      if (matches && matches.groups) {
        return matches.groups['id'];
      }

      return '';
    })();

    const episodePages = new Array<IEpisodePage>();
    let episodeCount = 0;

    $('.anime_video_body ul#episode_page li').each((_: any, ele: any) => {
      const a = $(ele).children('a');

      const start = Number(a.attr('ep_start'));
      const end = Number(a.attr('ep_end'));

      episodePages.push({ start, end });
    });

    episodePages.forEach(d => {
      if (d.end > episodeCount) {
        episodeCount = d.end;
      }
    });

    return {
      id,
      link,
      anime,
      movieId,
      videoId,
      episode,
      episodeCount,
      episodePages
    };
  }

  async animeInfo(
    id: string,
  ): Promise<IAnime> {
    const link = this.getUrlWithBase(`/category/${id}`);
    const res = await axios.get(link);
    const $ = cheerio.load(res.data);

    const animeInfoBody = $('.anime_info_body');
    const animeInfoBodyBg = animeInfoBody.children('.anime_info_body_bg');

    const movieId =
      $('input#movie_id.movie_id[type="hidden"]').attr('value') ?? '';
    const thumbnail = animeInfoBodyBg.children('img').attr('src') ?? '';
    const title = animeInfoBodyBg.children('h1').text().trim();

    const info: IAnime = {
      id,
      link,
      title,
      thumbnail,
      movieId,
      genres: [],
      episodeCount: 0,
      episodePages: []
    };

    animeInfoBodyBg.children('p.type').each((_: any, ele: any) => {
      const p = $(ele);

      const type = p
        .children('span')
        .text()
        .replace(':', '')
        .trim()
        .toLowerCase();

      const text = p.text().slice(`${type}:`.length).trim();

      if (type === 'type') {
        info.type = text;
        return;
      }

      if (type === 'plot summary') {
        info.summary = text;
        return;
      }

      if (type === 'genre') {
        p.children('a').each((_: any, _ele: any) => {
          info.genres.push(this._getEntityFromA($(_ele)));
        });
        return;
      }

      if (type === 'status') {
        info.status = text;
        return;
      }

      if (type === 'released') {
        info.released = text;
        return;
      }

      if (type === 'other name') {
        info.otherNames = text
          .split(', ')
          .map((t: string) => t.trim())
          .filter((t: string) => t !== '');
        return;
      }
    });

    $('.anime_video_body ul#episode_page li').each((_: any, ele: any) => {
      const a = $(ele).children('a');

      const start = Number(a.attr('ep_start'));
      const end = Number(a.attr('ep_end'));

      info.episodePages.push({ start, end });
    });

    info.episodePages.forEach(d => {
      if (d.end > info.episodeCount) {
        info.episodeCount = d.end;
      }
    });

    return info;
  }

  // async animeEpisodeVideo(
  //   videoId: string
  // ): Promise<IVideoRes> {
  //   const link = this.getUrl('https://streamani.net', '/streaming.php');
  //   const res = await axios.get<IVideoRes>(link, {
  //     headers: {
  //       referer: `https://streamani.net/streaming.php?id=${videoId}`,
  //       'user-agent':
  //         'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
  //     },
  //     params: {
  //       id: videoId,
  //       refer: this.baseUrl
  //     }
  //   });

  //   return res.data;
  // }

  getUrlWithBase(path: string): string {
    return this.getUrl(this.baseUrl, path);
  }

  getUrlWithApi(path: string): string {
    return this.getUrl(this.apiBaseUrl, path);
  }

  getUrl(base: string, path: string): string {
    const url = new URL(path, base);

    return url.toString();
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  protected _getEntityFromA(a: cheerio.Cheerio, baseUrl = this.baseUrl): GogoEntityBasic {
    const href = a.attr('href') ?? '';
    const title = a.attr('title') ?? '';

    const id = getIdFromPath(href);
    const link = new URL(href, baseUrl).toString();

    return {
      id,
      title,
      link
    };
  }

  protected _getPaginatedAnimeList(
    $: cheerio.Root
  ): Omit<GogoPagination<GogoEntity>, 'page'> {
    const paginations = new Array<number>();
    const data = new Array<GogoEntity>();

    $('div.anime_name_pagination div.pagination ul.pagination-list li').each(
      (_: any, ele: any) => {
        const a = $(ele).children('a');

        const number = a.data('page');

        paginations.push(number);
      }
    );

    $('div.last_episodes ul.items li').each((_: any, ele: any) => {
      const a = $(ele).find('p.name a');
      const thumbnail = $(ele).find('div.img a img').attr('src') ?? '';

      data.push({ ...this._getEntityFromA(a), thumbnail });
    });

    return {
      data,
      paginations
    };
  }
}