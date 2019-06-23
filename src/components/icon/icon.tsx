import React, { FC } from 'react';
import { IconName } from '@fortawesome/fontawesome-common-types';
import cn from 'classnames';

import './icon.scss';

export type IconPrefix = | 'fa' | 'fas' | 'far';

interface IconProps {
    className?: string;
    id?: string;
    title?: string;
    icon: IconName;
    iconPrefix: IconPrefix;
    disabled?: boolean;
    name?: string;
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-larger';

    onIconClick?(args?: any): void;
}

export const Icon: FC<IconProps> = (props: IconProps) => {
    const iconSize = {
        fontSize: props.size
    };

    return (
        <i className={ `${ cn(props.className, { 'disabled': props.disabled }) } ${ props.iconPrefix } fa-${ props.icon }` }
           style={ iconSize }
           title={ props.title }
           id={ props.id }
           onClick={ props.onIconClick }><span>{ props.name }</span></i>)
};
