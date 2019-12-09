import React, { Component } from 'react';
import '../Styles/SearchBook.css'

class SearchBook extends Component {

    render() {
        return (
            <div>
                <input
                  className="search-input"
                  type="text"
                  value={this.props.value}
                  onChange={this.props.changed}
                />
                <button
                  className="search-button"
                  onClick={this.props.clicked}
                >
                  Search
                </button>
            </div>

        )
    }

}

export default SearchBook;