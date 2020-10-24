import React from 'react';
import '../../styles/CardObject.scss'

export function CardObject() {
        return (
            <div className="card">
                <div className="card-image"/>
                <div className="card-description">
                    <p className="card-description-title">Pokemon name</p>
                    <p className="card-description-subtitle">Artist</p>
                </div>
            </div>
        )
}