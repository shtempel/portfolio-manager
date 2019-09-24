import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { Icon } from '..';
import { deleteAllErrors } from '../../store/errors/actions';
import { selectLastError } from '../../store/errors/selectors';
import { AppError } from '../../store/errors/typings';
import { AppState } from '../../store/typings';

import './toaster.scss';


export const Toaster: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();

    const lastError = useSelector<AppState, AppError | undefined>(selectLastError);
    const onDeleteClick = () => dispatch({ type: getType(deleteAllErrors) });

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

export default Toaster;
