import './themeToggleComponent.css'

import React from 'react';
import { connect } from "react-redux";

import { setTheme } from '../actions/setTheme';
import { Theme } from './themes';

export class ThemeToggleComponent extends React.Component {
    selectedTheme;

    componentDidMount() {
        this.loadTheme();
    }

    componentDidUpdate(previousProps) {
        this.selectedTheme = this.props.themeSet;
    }

    loadTheme() {
        const themeInStorage = localStorage.getItem('theme');
        const themeAsJSON = JSON.parse(themeInStorage);
        
        this.props.setTheme(themeAsJSON);
    }

    storeTheme() {
        localStorage.setItem('theme', JSON.stringify(this.selectedTheme));
    }

    onToggle(toggleState) {
        this.selectedTheme = toggleState ? Theme.DarkMode : Theme.LightMode;
        this.storeTheme();

        this.props.setTheme(this.selectedTheme);
    }

    render() {
        return (
            <div>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={ this.props.themeSet === Theme.DarkMode }
                        onChange={(event) => this.onToggle(event.target.checked)} />
                    <span className="slider round"></span>
                </label>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    themeSet: state.themeSetReducer
});

export default connect(mapStateToProps, { setTheme })(ThemeToggleComponent);