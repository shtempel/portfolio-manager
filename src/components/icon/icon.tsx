import React, { FunctionComponent } from 'react';
import { IconName } from '@fortawesome/fontawesome-common-types';

export type IconPrefix = | 'fa' | 'fas' | 'far';

interface IconProps {
    className?: string;
    id?: string;
    title?: string;
    icon: IconName;
    iconPrefix: IconPrefix;
    onIconClick?: any;
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-larger';
}

export const Icon: FunctionComponent<IconProps> = (props: IconProps) => {
    const iconSize = {
        fontSize: props.size
    };
    return (
        <i className={ `${ props.className }  ${ props.iconPrefix } fa-${ props.icon }` }
           style={ iconSize }
           title={ props.title }
           id={ props.id }
           onClick={ props.onIconClick }/>
    );
};
