import React, { Component } from 'react';
import flvjs from 'flv.js';

export default class Live extends Component {
    constructor(props) {
        super(props);
        this.playerRef = React.createRef();
    }

    componentDidMount() {
        this.flvplayer = flvjs.createPlayer({
            type: 'flv',
            url: 'ws://localhost:8000/test/app'
        });
        this.flvplayer.attachMediaElement(this.playerRef.current);
        this.flvplayer.load();
        this.flvplayer.play();
    }

    componentWillUnmount() {
        this.flvplayer.destroy();
    }

    render() {
        return (
            <>
                <h2>CCTV Feed</h2>
                <video ref={this.playerRef} controls />
            </>
        )
    }
}
