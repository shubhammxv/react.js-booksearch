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
                                pageCount={book.pageCount}
                                averageRating={book.averageRating}
                                ratingsCount={book.ratingsCount}
                                pageCount={book.pageCount}
                                imageLink={imageLink}
                            />
                            <hr />
                        </div>
                    )
                })
                this.setState({booksData: booksData, currentSearch: ''})
            }
            catch (err) {
                let booksData = (
                    <div className="error">
                        Book with ISBN No. <span style={{color: 'red'}}>{this.state.currentSearch.toUpperCase()}</span> was not found!
                    </div>
                )
                this.setState({booksData: booksData, currentSearch: ''})
              // alert('Product does not exist') 
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