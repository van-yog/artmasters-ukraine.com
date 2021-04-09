let root = document.getElementById('root');

class App extends React.Component {
  constructor({ imgs }) {
    super();
    let gallery = [];
    let allPhoto = imgs;
    for (let k = 0; k < allPhoto; k++) gallery.push(k);

    this.state = {
      currentPhoto: 0,
      prevPhoto: null,
      allPhoto,
      gallery,
      showAll: false,
      isRight: true,
      thumbsPush: false,
      text: [
        `Ворони / Crows,
        полотно олія / canvas, oil
          80x110 cm`,
        `Півень / A cock
          полотно, олія / canvas, oil
          75x105 cm`,
        'Картина 3, Гуаш, Холст 300*500',
        'Картина 4, Масло, Холст',
        'Картина 5, Масло, Холст 200*10',
        'Картина 6, Акварель, Холст',
        'Картина 7, Гуаш, Холст',
        'Картина 8, Масло, Холст',
        'Картина 9, Масло, Холст',
        'Картина 10, Масло, Холст',
        'Картина 11, Масло, Холст',
        'Картина 12, Масло, Холст',
        'Картина 13, Масло, Холст',
      ],
    };
  }

  leftPhoto = () => {
    this.setState((x) => ({
      currentPhoto: x.currentPhoto === 0 ? x.allPhoto - 1 : x.currentPhoto - 1,
      prevPhoto: x.currentPhoto,
      isRight: false,
      thumbsPush: false,
    }));
  };

  rightPhoto = () =>
    this.setState((x) => ({
      currentPhoto: x.currentPhoto === x.allPhoto - 1 ? 0 : x.currentPhoto + 1,
      prevPhoto: this.state.currentPhoto,
      isRight: true,
      thumbsPush: false,
    }));

  showAllGallery = () => this.setState({ showAll: !this.state.showAll });

  thumbsPush = (idx) =>
    this.setState((x) => ({
      currentPhoto: idx,
      prevPhoto: x.currentPhoto,
      thumbsPush: true,
    }));

  render() {
    let {
      currentPhoto,
      gallery,
      prevPhoto,
      isRight,
      thumbsPush,
      showAll,
    } = this.state;
    return (
      <React.Fragment>
        <div className="gallery__top">
          <button className="left-gallery" onClick={this.leftPhoto}>
            <i class="fas fa-angle-left"></i>
          </button>

          {this.state.gallery.map((item, idx) => {
            let display =
              currentPhoto === idx || prevPhoto === idx
                ? 'show-content'
                : 'hide-content';

            if (thumbsPush) {
              isRight = currentPhoto > prevPhoto ? true : false;
            }

            return (
              <a
                key={item}
                className={`gallery__main-link 
                  ${display} 
                  ${
                    currentPhoto === idx ? (isRight ? 'toLeft' : 'toRight') : ''
                  }
                  ${prevPhoto === idx && 'hidePhoto'}`}
                href={`../src/img/artists/zhukow_andrii/react-gallery/${
                  idx + 1
                }.jpg`}
                target="_blank"
              >
                <img
                  className={`gallery__main-img`}
                  src={`../src/img/artists/zhukow_andrii/react-gallery/${
                    idx + 1
                  }.jpg`}
                />
              </a>
            );
          })}
          <button className="right-gallery" onClick={this.rightPhoto}>
            <i class="fas fa-angle-right"></i>
          </button>
        </div>

        <div className="gallery__text">
          {this.state.text[this.state.currentPhoto]
            .split('\n')
            .map((item, idx) => {
              let arr = item.split('/');
              let style = idx === 0 ? 'nazvanie' : 'cormorant';
              return (
                <p className={style}>
                  <span>{arr[0]}</span> / <span>{arr[1]}</span>
                </p>
              );
            })}
        </div>

        <div
          className={`gallery__thumbs ${showAll ? 'gallery__thumbs-all' : ''}`}
        >
          {this.state.gallery.map((item, idx) => {
            let isShow;
            if (idx >= currentPhoto - 3 && idx <= currentPhoto + 3)
              isShow = true;
            if (currentPhoto < 3 && idx < 7) isShow = true;
            if (currentPhoto >= gallery.length - 3 && idx >= gallery.length - 7)
              isShow = true;

            if (showAll) isShow = true;
            return (
              <img
                className={`gallery__thumbs-img ${
                  idx === currentPhoto ? 'gallery__acitve-thumbs' : ''
                }  `}
                style={{
                  display: `${isShow ? 'block' : 'none'}`,
                }}
                key={item}
                data-id={idx}
                src={`../src/img/artists/zhukow_andrii/react-gallery/${
                  idx + 1
                }.jpg`}
                onClick={() => this.thumbsPush(idx)}
              />
            );
          })}
        </div>
        <div className="gallery__show-all">
          <button
            id="showAll"
            onClick={() => this.showAllGallery()}
            type="button"
          >
            {!this.state.showAll
              ? 'Більше робіт / More artworks'
              : 'Менше робіт / Less artworks'}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App imgs={13} />, root);
