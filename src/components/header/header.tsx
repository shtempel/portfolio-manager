import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
    const { t } = useTranslation();

    return <h1>{ t('header.title') }</h1>
};
