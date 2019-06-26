import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { AppState } from '../../store/typings';

import './symbol-search.scss';

interface SymbolSearchProps {
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
};

export const SymbolSearch: FC<SymbolSearchProps> = (props: SymbolSearchProps) => {
    const { t } = useTranslation();

    const searchInput: ReactNode = (
        <input type='text'  placeholder={ t('search.placeholder') }/>
    );

    return (
        <div className='total-row'>
            { searchInput }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SymbolSearch);
