import React, { PureComponent } from 'react'
import { ContextTypeNames, SnackContext, SSBookmarkedAnimeContext, SSBookmarkedAnimeContextType } from '../../utils';

export function sideStreamWrapper(WrappedComponent: React.ComponentClass<any, any>, desiredContexts?: ContextTypeNames[]) {
    class SideStreamWrapper<P, S> extends PureComponent<P, S> {
        static displayName: string;
        
        constructor(props: P) {
            super(props)
        }

        conditionalSubscribedProp(ssBookmarkedAnimeContext: SSBookmarkedAnimeContextType): {[index: string]: any} {
            let desiredProps: {[index: string]: any} = {};
            
            if (desiredContexts) {
                desiredContexts.forEach(context => {
                    switch (context) {
                        case ContextTypeNames.SSBookmarkedAnimeContext:
                            desiredProps['ssBookmarkedAnimeContext'] = ssBookmarkedAnimeContext
                            break;
                        default:
                            break;
                    }
                })
            }
            

            return desiredProps
        }

        render() {
            return (
                <SnackContext.Consumer>
                    {(SnackContext) => (
                        <SSBookmarkedAnimeContext.Consumer>
                             {(SSBookmarkedAnimeContext) => (
                                <WrappedComponent snackContext={SnackContext} {...this.conditionalSubscribedProp(SSBookmarkedAnimeContext)} {...this.props} />
                            )}
                        </SSBookmarkedAnimeContext.Consumer>
                    )}
                </SnackContext.Consumer>

            )
        }
    }

    SideStreamWrapper.displayName = `SideStreamWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return SideStreamWrapper;
}

