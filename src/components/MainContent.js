import React from 'react';
import '../styles/MainContent.scss'
import {Navigation} from './Cards/Navigation'
import {CardTable} from "./Cards/CardsTable";

export function MainContent() {
    return (
        <div className="main_content">
            <Navigation />
            <CardTable />
        </div>
    );
}