import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, LangPanel } from '..';

import './header.scss';

export const Header: FC = () => {
    const { t } = useTranslation();

    return (
        <div className='header row'>
            <div className='left'>
                <Icon icon='react' iconPrefix='fab'/>
                <h1>{ t('title') }</h1>
            </div>
            <LangPanel/>
        </div>
    );
};
