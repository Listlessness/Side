import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AnimeDetailsPageProps, AnimeDetailsPageState } from './animeDetailsPage.types'
import { AnimeById } from '../../utils';

type State = AnimeDetailsPageState<AnimeById>;

export class AnimeDetailsPage extends PureComponent<AnimeDetailsPageProps, State> {
    constructor(props: AnimeDetailsPageProps) {
        super(props)
    
        this.state = {
            animeDetailsById: undefined
        }
    }
    

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
