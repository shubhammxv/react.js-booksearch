import React, { Component } from 'react';
import '../Styles/DataFetch.css'
import Book from './BookData';
import SearchBook from './SearchBook'

class FetchData extends Component {
    state = {
            booksData : [],
            currentSearch: ''
        }

    componentDidMount( isbn='' ) {
        let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
        fetch(url)
        .then(results => {
            return results.json();
        })
        .then(data => {
            try {
                let booksData = data.items.map((bookData) => {
                    let book = bookData.volumeInfo;
                    let imageLink;
                    try {
                        imageLink = book.imageLinks.thumbnail;
                    }
                    catch(err) {
                        imageLink = 'https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png'
                    }
                    return (
                        <div 
                            key={bookData.id} >
                            <Book 
                                title={book.title}
                                authors={book.authors}
                                publisher={book.publisher}
                                publishedDate={book.publishedDate}
                                description={book.description}
                                averageRating={book.averageRating}
                                ratingsCount={book.ratingsCount}
                                imageLink={imageLink}
                            />
                            <hr />
                        </div>
                    )
                })
                this.setState({booksData: booksData})
            }
            catch (err) {
                alert('Product does not exist')
            }
        })
    }

    onChangeHandler = (event) => {
        this.setState({currentSearch: event.target.value})
    }

    searchClickHandler = () => {
        this.componentDidMount(this.state.currentSearch);
    }

    render() {
        return (
            <div>
            <SearchBook clicked={this.searchClickHandler} changed={this.onChangeHandler} value={this.state.currentSearch}/>
            <div className="bookData">
                {this.state.booksData}
            </div>
            </div>
        )
    }
}

export default FetchData;