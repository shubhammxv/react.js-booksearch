import React, { Component } from 'react';
import '../Styles/BookData.css'

class Book extends Component {

    render() {
        let star = "★";
        let propsData = {
            title: this.props.title,
            authors: this.props.authors,
            publisher: this.props.publisher,
            publishedDate: this.props.publishedDate,
            pageCount: this.props.pageCount,
            averageRating: star.repeat(this.props.averageRating),
            ratingsCount: this.props.ratingsCount,
            imageLink: this.props.imageLink
        }

        Object.keys(propsData).forEach(key => {
            if (propsData[key] === undefined || propsData[key] === '') {
                propsData[key] = "NA"
            }
        })

        return(
            <div className="BookData">
                <div><img src={propsData.imageLink} alt="Book" /></div>
                <div className="Book">
                    <div><b>Title:</b> {propsData.title}</div>
                    <div><b>Author: </b>{propsData.authors}</div>
                    <div><b>Publisher: </b>{propsData.publisher}</div>
                    <div><b>Published Date: </b>{propsData.publishedDate}</div>
                    <div><b>Page Count: </b>{propsData.pageCount}</div>
                    <div><b>Average Rating: </b>{propsData.averageRating} </div>
                    <div><b>Rating Counts: </b>{propsData.ratingsCount}</div>
                    {/* <p>Description: {this.props.description}</p> */}
                </div>
            </div>
        )
    }
}

export default Book;