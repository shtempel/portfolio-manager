import React, { FC } from 'react';
import cn from 'classnames'

import { Icon, IconPrefix } from '..';
import { IconName } from '@fortawesome/fontawesome-common-types';

import './button.scss';

type ButtonType = 'button' | 'reset' | 'submit';

interface ButtonProps {
    name?: string;
    customClass?: string;
    id?: string;
    disabled?: boolean;
    buttonType?: ButtonType;
    icon?: { iconName: IconName, iconPrefix: IconPrefix };

    onButtonClick?(args?: any): any;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
    const { id, icon, customClass, name, buttonType, disabled, onButtonClick } = props;

    return icon
        ? <Icon className={ cn(`button ${ customClass }`, { 'not-active-btn': disabled }) }
                id={ id }
                onIconClick={ onButtonClick }
                disabled={ disabled }
                icon={ icon.iconName }
                name={ name }
                iconPrefix={ icon.iconPrefix }/>
        : <button type={ buttonType }
                  className={ `button ${ customClass }` }
                  disabled={ disabled }
                  id={ id }
                  onClick={ onButtonClick }>{ name }</button>;
};
