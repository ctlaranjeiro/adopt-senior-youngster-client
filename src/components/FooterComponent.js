import React, { Component } from 'react';

export default class FooterComponent extends Component {
    render() {
        return(
            <div>
                <footer className="bottom">
                    <div className="authors">
                        <p>Ironhack Project #3</p>
                        <p>&copy; 2020 | Catarina &amp; Bruno</p>
                    </div>
                    <div className="social">
                        <a href="http://www.facebook.com">
                            <img alt="facebook.com" src="/../icons/facebook-icon.png" />
                        </a>
                    </div>
                </footer>
            </div>
        )
    }
}

