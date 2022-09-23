
import React, { useState, useEffect } from 'react';
import myData from "./mydata.json"
// import InfiniteScroll from 'react-infinite-scroll-component';
import Picture from './components/Picture';
function App() {
  const A = 48;
  const B = 3;
  const C = 2;
  const D = 3;

  const [currentIndexPhoto, setCurrentIndexPhoto] = useState(2);
  const [indexFetchData, setindexFetchData] = useState(B + C + D);
  const [images, setImages] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [chosenPic, setChosenPic] = useState("");
  const [first, setFirst] = useState({
    url: "",
    desc: "",
    id: ""
  });
  const [second, setSecond] = useState({
    url: "",
    desc: "",
    id: ""
  });
  const [third, setThird] = useState({
    url: "",
    desc: "",
    id: ""
  });

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images[0]) {
      setFirst({ url: images[currentIndexPhoto].url, desc: images[currentIndexPhoto].description });
      setSecond({ url: images[currentIndexPhoto + 1].url, desc: images[currentIndexPhoto + 1].description });
      setThird({ url: images[currentIndexPhoto + 2].url, desc: images[currentIndexPhoto + 2].description });
    }
  }, [isChange]);


  const fetchImages = (count = (B + C + D)) => {
    var arr = []
    for (var i = 0; i < count && i < A; i++) {
      arr.push(myData[i]);
    }
    setImages(...images, arr);
    setIsChange(!isChange);

  };

  function prevPhoto() {
    setIsChange(!isChange);
    if (currentIndexPhoto > 0) {
      setCurrentIndexPhoto(currentIndexPhoto - 1);
    } else if ((indexFetchData - (B + C + D)) > 0) {
      var arr = [];
      for (let i = (B + C + D - 1); i > 0; i--) {
        arr[i] = images[i - 1];
      }
      arr[0] = myData[indexFetchData - (B + C + D) - 1];
      setImages(arr);
      setindexFetchData(indexFetchData - 1)
    }
    checkIfChosen(chosenPic);
  }


  function nextPhoto() {
    setIsChange(!isChange);
    if (currentIndexPhoto < (B + C + D - 3)) {
      setCurrentIndexPhoto(currentIndexPhoto + 1);
    } else if (indexFetchData < A) {
      var arr = [];
      for (let i = 0; i < (B + C + D - 1); i++) {
        arr[i] = images[i + 1];
      }
      arr[B + C + D - 1] = myData[indexFetchData];
      setImages(arr);
      setindexFetchData(indexFetchData + 1)
    }
    checkIfChosen(chosenPic);

  }

  function clickHandle(desc) {
    setChosenPic(desc);
  }

  function checkIfChosen(desc) {
    if (first.desc !== desc && second.desc !== desc && third.desc !== desc) {
      setChosenPic("");
    }
  }

  return (
    <div className='' >
      {/* <InfiniteScroll
        dataLength={images.length}
        next={() => {
          setIsLoaded(false);
          fetchImages(3);
        }}
        hasMore={images.length < 48 ? true : false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={() => { setIsLoaded(false) }}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        <div className='container'>
          <div className='row'>
            <div className='col-6 col-lg-3 col-md-2 col-sm-6'>
              <div style={{ marginTop: "30px" }}>
                {loaded ?
                  images.map((image, index) => (
                    <Picture url={image.url} key={index} myKey={index} desc={image.description} />
                  )) : []}
              </div>
            </div>
          </div>
        </div>

      </InfiniteScroll> */}
      <div className='btndiv'>
        <button className='btn btn-info btn-lg' onClick={prevPhoto} disabled={(indexFetchData === (B + C + D) && currentIndexPhoto === 0)}>Previous Picture</button>
      </div>
      <div className='container'>
        <div className='row'>
          <div className=''>

            <div className='container' >
              {first.url ? <Picture url={first.url} desc={first.desc} func={clickHandle} chosenPic={chosenPic === first.desc} /> : ""}
              {second.url ? <Picture url={second.url} desc={second.desc} func={clickHandle} chosenPic={chosenPic === second.desc} /> : ""}
              {third.url ? <Picture url={third.url} desc={third.desc} func={clickHandle} chosenPic={chosenPic === third.desc} /> : ""}

              {/* {loaded ?
                images.map((image, index) => (
                  <Picture url={image.url} key={image.url} myKey={image.url} desc={image.description} />
                )) : []} */}
            </div>
          </div>
        </div>
      </div>
      <div className='btndiv'>
        <button className='btn btn-info btn-lg' onClick={nextPhoto} disabled={indexFetchData === A}>Next Picture</button>
      </div>
    </div>


  );
}

export default App;
