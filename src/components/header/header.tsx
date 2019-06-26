import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '..';

import './header.scss';

export const Header: FC = () => {
    const { t } = useTranslation();

    return (
        <div className='header'>
            <Icon icon='react' iconPrefix='fab'/>
            <h1>{ t('header.title') }</h1>
        </div>
    );
};
