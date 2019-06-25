import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import './table-footer.scss';

interface TableFooterProps {

}

export const TableFooter: FC<TableFooterProps> = (props: TableFooterProps) => {
    const { t } = useTranslation();

    const searchInput: ReactNode = (
        <input type='text' placeholder={ t('search.placeholder') }/>
    );

    return (
        <div className='total-row'>
            { searchInput }
        </div>
    );
};
