import './themeToggleComponent.css'

import React from 'react';
import { connect } from "react-redux";

import { setTheme } from '../actions/setTheme';
import { Theme } from './themes';

export class ThemeToggleComponent extends React.Component {
    onToggle(toggleState) {
        const theme = toggleState ? Theme.DarkMode : Theme.LightMode;
        this.props.setTheme(theme);
    }

    render() {
        return (
            <div>
                <label className="switch">
                    <input type="checkbox" onChange={(event) => this.onToggle(event.target.checked)} />
                    <span className="slider round"></span>
                </label>
            </div>
        )
    }
}

export default connect(null, { setTheme })(ThemeToggleComponent);