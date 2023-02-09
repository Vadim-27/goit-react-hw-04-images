import { useState, useEffect } from 'react';
import searchImages from 'components/services/gallery-api';

import Modal from 'components/Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';



import Searchbar from './Searchbar/Searchbar';
import css from './my-gallery.module.css';


const MyGallery = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImg = async ()=>{
    try {
      setLoading(true);
      
      const data = await searchImages(search, page);

      setItems(prevItems => ([...prevItems, ...data.hits]));
      setTotal(data.totalHits);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    }
    fetchImg();
  }, [search, page])


 const searchPictures = ( search ) => {
   console.log(search, "pic ");
   setSearch(search);
   setItems([]);
   setPage(1);   
  };


 const loadMore = () => {
   setPage(prevPage => prevPage + 1);
  };

  const showImage = largeImageURL => {
    setShowModal(true);
    setImageDetails(largeImageURL);
    
  };

  const closeModal = () => {
    setShowModal(false)
    
  };

    const totalPage = total / (page * items.length);
    return (
      <div className={css.wrapper}>
        <Searchbar onSubmit={searchPictures} />
        {loading && <Loader />}
        {error && <p>{error}</p>}
        <ImageGallery items={items} showImage={showImage} />
        {totalPage > 1 && <Button onLoadMore={loadMore} />}

        {showModal && (
          <Modal close={closeModal}>
            <img src={imageDetails} alt="" />
          </Modal>
        )}
      </div>
    );
  
}

export default MyGallery;
