import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            
            <header style={headerStyle}>
                <h1>TodoList</h1>
                <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
            </header>
        </div>
    )
    
}

const headerStyle = {
    background: "#333",
    textAlign :'center',
    color: '#fff',
    padding: '10px'
}

const linkStyle = {
    color: '#fff'
}

export default Header
