import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Icon } from '..';

import { deleteAllErrors } from '../../store/errors/actions';
import { selectLastError } from '../../store/errors/selectors';
import { AppError } from '../../store/errors/typings';
import { AppState } from '../../store/typings';

import './toaster.scss';

interface ToasterProps {
    lastError?: AppError;

    deleteAllErrors(): void;
}

const mapStateToProps = (state: AppState) => ({
    lastError: selectLastError(state)
});

const mapDispatchToProps = { deleteAllErrors };

export const Toaster: FC<ToasterProps> = (props: ToasterProps) => {
    const { lastError, deleteAllErrors } = props;
    const { t } = useTranslation();
    const onDeleteClick = () => deleteAllErrors();

    const error = lastError
        ? (
            <div className='toaster'>
                <span>{ t(`${ lastError.type }`) }</span>
                <Icon icon='times' className='btn-link' iconPrefix='fa'
                      onIconClick={ onDeleteClick }/>
            </div>
        )
        : null;
    return <>{ error }</>

};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toaster);
