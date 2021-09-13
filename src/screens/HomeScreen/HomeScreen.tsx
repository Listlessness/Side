import React, { PureComponent } from 'react';
import { CustomCarousel, ScrollScreenWrapper, sideStreamWrapper } from '../../components';
import { TMDBService } from '../../services';
import { LastWatchedAnimeItem, ContextTypeNames, TMDB_TV_Discover_Results } from '../../utils';
import { LandingScreenProps, LandingScreenState } from './homeScreen.types';
import { EpisodeThumbnail } from '../../components/Thumbnail/EpisodeThumbnail';
import { TV_AT_AR } from './helpers';

class LandingScreenComponent extends PureComponent<LandingScreenProps, LandingScreenState> {
    Carousels: { title: string; keyPrefix: string; fetchItems: () => Promise<any[]>; renderItem: ({ item, index }: { item: any; index: number; }) => JSX.Element; checkOnFocus?: boolean; }[];
    
    constructor(props: LandingScreenProps) {
        super(props)

        this.state = {
            refreshingCount: 0
        }

        this.Carousels = [
            {
                title: "Airing Today / Aired Recently",
                keyPrefix: 'AT-AR',
                fetchItems: this.__fetchTVAiring,
                renderItem: this.__renderLastWatchedItems,
            },
            {
                title: "Last Watched Anime",
                keyPrefix: 'LWA',
                fetchItems: this.__fetchLastWatchedItems,
                renderItem: this.__renderLastWatchedItems,
                checkOnFocus: true
            }
        ]
    }

    __onRefresh = () => {
        this.setState({refreshingCount: this.Carousels.length})
    }

    __reduceRefreshCount = () => {
        const { refreshingCount } = this.state;

        this.setState({refreshingCount: refreshingCount - 1})
    }

     /**
     * Airing Today / Aired Recently block
     */
      __renderTVAiring = ({item, index}: { item: TMDB_TV_Discover_Results; index: number; }) => {
        return (
            <EpisodeThumbnail
                key={index}
                id={item.id || ''}
                title={item.name || '?'}
                episode={'?'}
                url={'?'}
                picture_url={TMDBService.generatePosterURI(item.poster_path)}                
            />
        );
    }

    __fetchTVAiring = async () => {
        return await TMDBService.discoverTV(TV_AT_AR).then(resp => {
            return resp.results || [];
        })
    }

    /**
     * Last Watched Anime block
     */

    __renderLastWatchedItems = ({item, index}: { item: LastWatchedAnimeItem; index: number; }) => {
        return (
            <EpisodeThumbnail
                key={index}
                {...item}
            />
        );
    }

    __fetchLastWatchedItems = () => {
        if (this.props.ssLastWatchedAnimeContext) {
            return Promise.resolve(
                Object.values(this.props.ssLastWatchedAnimeContext.lastWatchedAnime).sort((a, b) => new Date(b.dateAdded).valueOf() - new Date(a.dateAdded).valueOf())
            )
        } else {
            return  Promise.resolve([])
        }
    }

    /**
     * 
     * renderer
     */

    render() {
        const { refreshingCount } = this.state;

        return (
            <ScrollScreenWrapper
                refreshing={refreshingCount !== 0}
                onRefresh={this.__onRefresh}
            >
                {this.Carousels.map((props, index) => {
                    <CustomCarousel
                        {...props}
                        onRefreshComplete={this.__reduceRefreshCount}
                        refreshing={refreshingCount !== 0}
                    />
                })}
            </ ScrollScreenWrapper>
        );
    }
}

export const LandingScreen = sideStreamWrapper(LandingScreenComponent, [ContextTypeNames.SSLastWatchedAnimeContext])
