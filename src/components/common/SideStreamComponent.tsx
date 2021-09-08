import React, { PureComponent } from 'react'
import { SnackContext } from '../../utils';

export class SideStreamComponent<P, S> extends PureComponent<P, S> {

    static contextType = SnackContext;
    declare context: React.ContextType<typeof SnackContext>;
    
    constructor(props: P) {
        super(props)
    }
}
