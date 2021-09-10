import { useFocusEffect } from '@react-navigation/native';
import React, { PureComponent } from 'react'
import { ContextTypeNames, SnackContext, SSBookmarkedAnimeContext, SSBookmarkedAnimeContextType } from '../../utils';

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
                                <WrappedComponent snackContext={SnackContext} OnScreenFocusComp={this.OnScreenFocusComp} {...this.conditionalSubscribedProp(SSBookmarkedAnimeContext)} {...this.props} />
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

