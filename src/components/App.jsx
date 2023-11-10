import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
//import {ImageGallery} from './ImageGallery/ImageGallery';
//import {Button} from './Button/Button';
//import {Loader from} './Loader/Loader';
//import {Modal} from './Modal/Modal';
import { searchImages } from '../data/data';

 const STATUS = {
   PENDING: 'PENDING',
   FULFILLED: 'FULFILLED',
   REJECTED: 'REJECTED',
   IDLE: 'IDLE',
};
 
export class App extends Component {
  state = {
    status: STATUS.IDLE,
    query: '',
    images: [],
    activeImage: null,
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate( prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;

    if (page !== prevPage || query !== prevQuery) {
      this.getImages();
    }
  }

  async getImages() {
    const { query, page, images } = this.state;

    this.setStatus(STATUS.PENDING);

    try {
      const { hits, totalHits } = await searchImages(query, page);

      if (!hits.length) {
        toast.info('Oooh oh, there are no results that match your query.');
        return;
      }

      this.setState({
        images: [...images, ...hits],
      });

      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setStatus(STATUS.FULFILLED);
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  handleSearchQuery = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalPages: 1,
      status: STATUS.IDLE,
    });
  };

  setActiveImageUrl = url => this.setState({ activeImage: url });

  setNextPage = () => this.setState(({ page }) => ({ page: page + 1 }));

  setStatus = status => this.setState({ status });

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSearch={this.handleSearchQuery} />
        <ToastContainer theme="colored" autoClose={3000} />
      </div>
    );
  }
}