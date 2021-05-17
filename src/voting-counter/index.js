import React, { Component } from "react";
import "./style.css";
import axios from 'axios';

class VoteCounter extends Component {
	constructor(props) {
		super(props);
		this.state = {
            images: []
        };
	}

	componentDidMount() {
        this.getImages();
    }
    
    getImages() {
        axios.get(`https://jsonplaceholder.typicode.com/photos`)
        .then(res => {
            let voteImages = res.data.filter((val,i)=> {
                val['vote'] = 0;
                return i < 10;
            });
            this.setState({ 
                images: voteImages.sort((a, b) => { return b.vote - a.vote; })
            });
        })
    }

    addVote(data, i) {
        let idx= this.state.images.findIndex(el => el.id == data.id);
        this.state.images[idx].vote++;
        this.setState({ 
            images: this.state.images.sort((a, b) => { return b.vote - a.vote; })
        });
    }

    resetVote() {
        this.getImages();
    }

	render() {
        let { images } = this.state;
		return (
			<div className="container row">
				<div className="col-10">
                    {
                        images.map((image,i) => (
                            <div className="row display-flex p-10 border-bottom" key={i}>
                                <img className="size" src={image.thumbnailUrl} title={image.title} alt={image.title} onClick={e => this.addVote(image,i)}/>
                                <div className="m-10">
                                    <h5>Title: {image.title}</h5>
                                    <h5>Vote: {image.vote}</h5>
                                </div>
                            </div>
                        ))
                    }
				</div>
                <div className="col-2 p-10">
                    <button className="btn btn-primary" onClick={e => this.resetVote()}>Reset Vote</button>
                </div>
			</div>
		);
	}
}

export default VoteCounter;