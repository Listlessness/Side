import { useFocusEffect } from '@react-navigation/native';
import React, { PureComponent } from 'react'
import { ContextTypeNames, SnackContext, SSBookmarkedAnimeContext, SSBookmarkedAnimeContextType, SSLastWatchedAnimeContext, SSLastWatchedAnimeContextType } from '../../utils';

export function sideStreamWrapper(WrappedComponent: React.ComponentClass<any, any>, desiredContexts?: ContextTypeNames[]) {
    class SideStreamWrapper<P, S> extends PureComponent<P, S> {
        static displayName: string;
        
        constructor(props: P) {
            super(props)
        }

        OnScreenFocusComp({callback, dependencies = []}: {callback: () => any, dependencies?: any[]}) {
            useFocusEffect(
              React.useCallback(callback, dependencies)
            );
          
            return null;
        }

        conditionalSubscribedProp(ssBookmarkedAnimeContext: SSBookmarkedAnimeContextType, ssLastWatchedAnimeContext: SSLastWatchedAnimeContextType): {[index: string]: any} {
            let desiredProps: {[index: string]: any} = {};
            
            if (desiredContexts) {
                desiredContexts.forEach(context => {
                    switch (context) {
                        case ContextTypeNames.SSBookmarkedAnimeContext:
                            desiredProps['ssBookmarkedAnimeContext'] = ssBookmarkedAnimeContext
                            break;
                        case ContextTypeNames.SSLastWatchedAnimeContext:
                            desiredProps['ssLastWatchedAnimeContext'] = ssLastWatchedAnimeContext
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
                                <SSLastWatchedAnimeContext.Consumer>
                                    {(SSLastWatchedAnimeContext) => (
                                        <WrappedComponent snackContext={SnackContext} OnScreenFocusComp={this.OnScreenFocusComp} {...this.conditionalSubscribedProp(SSBookmarkedAnimeContext, SSLastWatchedAnimeContext)} {...this.props} />
                                    )}
                                </SSLastWatchedAnimeContext.Consumer>
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

