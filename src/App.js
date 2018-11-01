import React, { Component } from 'react';
import styles from './App.css';

const lunchbotServiceUrl = 'https://lunchbot.tips';
// const lunchbotServiceUrl = '/api';

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends Component {
  constructor() {
    super();
    this.state = {places: [], list: [{}], inputValue: "", searchTerm: ''}
  }

  componentDidMount() {
    this.authenticate();
    fetch(`${lunchbotServiceUrl}/suggestion`)
    .then(res => res.json()).then((places) => {
      this.setState({ places: places.suggestions })
    })
    fetch(`${lunchbotServiceUrl}/suggestion/list`).then(res => res.json())
    .then((list) => {
      this.setState({ list: shuffle(list) })
    }).catch(console.log);
  }

  authenticate() {
    fetch(`${lunchbotServiceUrl}/user/auth`, { 
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          "userName": "Oscar",
          "password": "reggev-master"
      })
    }).then(res => res.json()).then((res)=> this.setState({token: res.token}))
  }

  goPlaces(placeId){
    console.log("go to:", placeId);
    fetch(`${lunchbotServiceUrl}/suggestion/${placeId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: {}
  }).then(res=> res.json()).then(console.log)
  }
  
  addPlace(placeId) {
    console.log(this.state.inputValue)
    fetch(`${lunchbotServiceUrl}/suggestion/${placeId}`, { 
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`,
      },
      mode: 'cors',
      body: JSON.stringify({
    })
  }).then(res=> res.json()).then(
    response => this.setState({list: [response, ...this.state.list], error: false})
  )
}

search() {
  console.log(this.state.inputValue)
  fetch(`${lunchbotServiceUrl}/search/${this.state.searchTerm}`, { 
    //method: 'POST',
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.state.token}`,
    },
    mode: 'cors',
}).then(res=> res.json()).then(
  searchResults => this.setState({searchResults, error: false})
)
.catch(() => this.setState({searchResults: null, error: true}))
}

  render() {
    const{ places = [], list = [], searchResults, error } = this.state;
    const place = places && places[0];
    // const regex = /(.*)(?=[0-9]{3} [0-9]{2})/gm;
    // const regex = /(.*(\d{3} \d{2}))/;
    // const regex = /(.*)(?=(\d{3} \d{2}))/;
    const regex = /(.*)(?=(, \d{3} \d{2}))/;
    return (
      <div className={styles.App}>
        <header className={styles["App-header"]}>
          {/* <img src={'https://seesparkbox.com/foundry/uploads/article_uploads/lunchbot.jpg'} className="App-logo" alt="logo" /> */}
          <img src='/logo.gif' className={styles["App-logo"]} alt="logo"/>
          {/* <img src='https://scontent-arn2-1.cdninstagram.com/vp/7cf2a311271c5ef0d296a7ad480de66c/5BD81323/t51.2885-15/sh0.08/e35/s750x750/29738965_2028902177430617_1722097549994622976_n.jpg?_nc_eui2=AeFdBbEE5h7veQXzMIcfmFM12OiKguWco-27H4rcB0tAEDWMYODh9Ra3FsE6VEQi7b4NLaSYKkncuINNL0NtRNL9' className="App-logo" alt="logo"/> */}
          <h1 className={styles["App-title"]}>Mr. Lunchbot</h1>
        </header>
        <div className={`${styles.content} container`}>
        <div className={`row justify-content-md-center ${styles["current-suggestion"]}`}>
            {/* {places.map(place => ( */}    
              { place &&
              <div className="col-lg-12">
                <h1>Today's suggestion</h1>
                <div key={place.placeId}>
                  <h3><a target="_blank" href={place.mapUrl}>{place.name}</a></h3>
                  <button onClick={() => this.goPlaces(place.placeId)} className={`btn-lg btn-${place.open? 'success': 'danger'}`}>Go here{place.open? '': ' soon'}!</button>
                  <p>Distance: {place.distance}, Time to walk: {place.time}</p>
                  {place.photos && place.photos.length && <img className="img-fluid mx-auto d-block rounded" src={place.photos[0]} alt="" />}
                </div>
              </div>
              }
            {/* ))} */}
          </div>
        <div className="row">
        <div className={`col-6 justify-content-md-center ${styles["search-place"]}`}>
            <h1>Search</h1>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">🔎</span>
              </div>
              <input onChange={(e)=> this.setState({searchTerm: e.target.value})} type="text" className="form-control" placeholder="Search for a place" aria-label="Place id" aria-describedby="basic-addon1" value={this.state.searchTerm}/>
              <div className="input-group-append">
                <button onClick={() => this.search()} className="btn btn-outline-secondary" type="button">Search</button>
              </div>
            </div>
            {
              error && <div className="col-12">
                <h2>No results :(</h2>
              </div>
            }
            { searchResults && 
            <div className="col-12">
              <h3>Search Results</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Place ID</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((place, index) => (
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td><a target="_blank" href={place.mapUrl}>{place.name}</a></td>                    
                      <td>{place.address}</td>
                      <td><button onClick={() => this.addPlace(place.placeId)} className="btn btn-success" type="button">Add</button>
                      </td>
                      {/* <td>{place.placeId}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            }
          </div>
        {/* <div className="row justify-content-md-center add-place">
            <h1>Add place</h1>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input onChange={(e)=> this.setState({inputValue: e.target.value})} type="text" className="form-control" placeholder="Place ID" aria-label="Place id" aria-describedby="basic-addon1" value={this.state.inputValue}/>
              <div className="input-group-append">
                <button onClick={() => this.addPlace(this.state.inputValue)} className="btn btn-outline-secondary" type="button">Add</button>
              </div>
            </div>
          </div> */}
          <div className="col-6">
          <div className="row justify-content-md-center list-all">
            <div className="col-12">
              <h3>Or maybe something else?</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((place, index) => (
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td><a target="_blank" href={place.website}>{place.name}</a> <br/> {(regex.exec(place.address)|| [''])[0]}</td>
                      <td><button onClick={() => this.goPlaces(place.placeId)} className={`btn-lg btn-${place.open? 'success': 'danger'}`}>I prefer this</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
         </div>
         </div>
         </div>
      </div>
    );
  }
}

export default App;
