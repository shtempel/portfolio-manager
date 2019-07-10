import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { AppState } from '../../store/typings';
import { selectLanguage } from '../../store/language/selectors';
import { setLanguage } from '../../store/language/actions';
import { Languages } from '../../services/typings';

import './lang-panel.scss';

interface LangPanelProps {
    language: string;

    setLanguage(language: string): void;
}

const mapStateToProps = (state: AppState) => ({
    language: selectLanguage( state ),
});

const mapDispatchToProps = { setLanguage };

const LangPanel: FC<LangPanelProps> = (props: LangPanelProps) => {
    const { language, setLanguage } = props;
    const { t } = useTranslation();

    const changeLanguage = (e: any) => {
        if ( e.target.id !== language ) {
            setLanguage( e.target.id );
            window.location.reload();
        }
    };

    return (
        <div className='lang-panel row'>
            <span id={ Languages.en }
                  onClick={ changeLanguage }
                  className={ cn( 'not-active', { 'active': language === 'en-US' } ) }>{ t( 'eng' ) }</span>
            <span id={ Languages.ru }
                  onClick={ changeLanguage }
                  className={ cn( 'not-active', { 'active': language === 'ru-RU' } ) }>{ t( 'rus' ) }</span>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( LangPanel );
