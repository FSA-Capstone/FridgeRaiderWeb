import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.paginate = this.paginate.bind(this);
	}

  paginate() {
    const {maxPages, pageNumber} = this.props
    let start = 0;
    let end = 0;
    let top = false;
    if(maxPages > 1) {
      start = pageNumber - 5;
      end = pageNumber + 5;
      if(start <= 1) {
          start = 1;
      }
      if(end >= maxPages) {
          end = maxPages;
          top = true;
      }
    }
    let pages = []
    if(start > 1){
      pages.push(<Link to="/recipes/page/1" key="a" className="pageNumbers">1</Link>)
      if(start > 2) {
        pages.push(<span  key="adots" className="dots">...</span>)
      }
    }
    for(start; start <= end; start++) {
      if(start === pageNumber*1) {
        pages.push(<span key={start} className='pageNumbers disabledNumber' >{start}</span>)
      } else {
        pages.push(<Link key={start} to={`/recipes/page/${start}`} className='pageNumbers' >{start}</Link>)
      }
    }
    if(!top) {
        if(end < (maxPages - 1)) {
          pages.push(<span key="bdots" className="dots">...</span>)
        }
        pages.push(<Link to={`/recipes/page/${maxPages}}`} key="b" className="pageNumbers">{maxPages}</Link>)
    }
    return pages
  }

	render() {
    return (
      <Typography id="pagination">
        {this.paginate()}
      </Typography>
    )
  }
}

export default Pagination