import React from 'react';
import { Colors, IconButton } from 'react-native-paper';
import { CustomCarousel, StackItem, Thumbnail, ScrollPageWrapper, SideStreamComponent } from '../../components';
import { JikanService, GogoAnimeService } from '../../services';
import { GogoRecentRelease } from '../../services/GogoanimeAPI/gogoanimeScraper';
import { TopItem, JikanTypes, JikanAnimeSubTypes, SubTypes, SeasonAnime, SeasonResult } from '../../utils';
import { LandingPageProps, LandingPageState } from './landingPage.types';

export class LandingPage extends SideStreamComponent<LandingPageProps, LandingPageState> {
    
    constructor(props: LandingPageProps) {
        super(props)

        this.state = {
            refreshingCount: 0
        }
    }

    __onRefresh = () => {
        this.setState({refreshingCount: 5})
    }

    __reduceRefreshCount = () => {
        const { refreshingCount } = this.state;

        this.setState({refreshingCount: refreshingCount - 1})
    }

    __renderStackItem = ({item, index}: { item: GogoRecentRelease; index: number; }) => {
        return (
            <StackItem
                key={index}
                id={item.id}
                title={item.title}
                picture_url={item.thumbnail}
                url={item.link}
                episode={item.episode}
            />
        );
    }
    
    __renderThumbnailItem = ({item, index}: { item: TopItem | SeasonAnime; index: number; }) => {
        return (
            <Thumbnail
                key={index}
                mal_id={item.mal_id}
                title={item.title}
                url={item.url}
                score={item.score}
                picture_url={item.image_url}
                type={item.type}
            />
        );
    }
    
    __fetchStackItems = () => GogoAnimeService.fetchRecentlyAddedEpisodes().then(resp => {
        return resp.data.slice(0,10);
    })
    
    __fetchThumbnailItems = (subType: SubTypes) => JikanService.fetchTop(JikanTypes.Anime, 1, subType).then(resp => {
        return resp.top.slice(0,10);
    })

    __fetchThisSeasonsItems = () => JikanService.fetchSeason().then(resp => {
        return resp.anime.slice(0,10);
    })
    
    
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon='magnify'
                    color={Colors.white}
                    size={25}
                    onPress={() => this.props.navigation.navigate('Search')}
                />
              ),
          });
    }

    render() {
        const { route, navigation } = this.props;
        const { refreshingCount } = this.state;

        return (
            <ScrollPageWrapper
                refreshing={refreshingCount !== 0}
                onRefresh={this.__onRefresh}
            >
                <CustomCarousel
                    title="Latest Episodes"
                    keyPrefix='LE'
                    refreshing={refreshingCount !== 0}
                    onRefreshComplete={this.__reduceRefreshCount}
                    fetchItems={this.__fetchStackItems}
                    renderItem={this.__renderStackItem}
                    type='stack'
                    onPress={() => {
                        navigation.navigate("Latest Episodes")
                    }}
                />
                {/* <CustomCarousel
                    title="Continue Watching"
                    keyPrefix='CW'
                    refreshing={refreshingCount !== 0}
                    onRefreshComplete={this.__reduceRefreshCount}
                    fetchItems={this.__fetchThisSeasonsItems}
                    renderItem={this.__renderThumbnailItem}
                    type='thumbnail'
                    onPress={() => {
                        navigation.navigate("Top Anime", {topType: JikanAnimeSubTypes.Upcoming})
                    }}
                /> */}
                <CustomCarousel
                    title="Top Airing Anime"
                    keyPrefix='TAA'
                    refreshing={refreshingCount !== 0}
                    onRefreshComplete={this.__reduceRefreshCount}
                    fetchItems={this.__fetchThumbnailItems.bind(this, JikanAnimeSubTypes.Airing)}
                    renderItem={this.__renderThumbnailItem}
                    type='thumbnail'
                    onPress={() => {
                        navigation.navigate("Top Anime", {topType: JikanAnimeSubTypes.Airing})
                    }}
                />
                <CustomCarousel
                    title="Top Upcoming Anime"
                    keyPrefix='TUA'
                    refreshing={refreshingCount !== 0}
                    onRefreshComplete={this.__reduceRefreshCount}
                    fetchItems={this.__fetchThumbnailItems.bind(this, JikanAnimeSubTypes.Upcoming)}
                    renderItem={this.__renderThumbnailItem}
                    type='thumbnail'
                    onPress={() => {
                        navigation.navigate("Top Anime", {topType: JikanAnimeSubTypes.Upcoming})
                    }}
                />
                <CustomCarousel
                    title="Current Season's Anime"
                    keyPrefix='CSA'
                    refreshing={refreshingCount !== 0}
                    onRefreshComplete={this.__reduceRefreshCount}
                    fetchItems={this.__fetchThisSeasonsItems}
                    renderItem={this.__renderThumbnailItem}
                    type='thumbnail'
                    onPress={() => {
                        navigation.navigate("Simple List", {
                            fetchItems: () =>  JikanService.fetchSeason(),
                            itemsExtracter: (resp: SeasonResult) => resp.anime,
                            renderItem: this.__renderThumbnailItem,
                            nameExtracter: (resp: SeasonResult) => `${resp.season_name} ${resp.season_year}`
                        })
                    }}
                />
            </ ScrollPageWrapper>
        );
    }
}
