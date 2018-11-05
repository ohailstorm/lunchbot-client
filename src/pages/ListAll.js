import React, { Component } from 'react';
import PlacesList from '../components/PlacesList';
import PageWrapper from '../components/PageWrapper';
import styles from '../pages/Start.css';

const lunchbotServiceUrl = 'https://lunchbot.tips';

export default class ListAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      regex: ''
    };
  }

  componentDidMount() {
    fetch(`${lunchbotServiceUrl}/suggestion/list`)
      .then(res => res.json())
      .then(list => {
        console.log('LIST', list);

        this.setState({ list: list });
      })
      .catch(console.log);
  }

  render() {
    const { list, regex } = this.state;
    return (
      <PageWrapper styles={styles}>
        <PlacesList list={list} regex={regex} />
      </PageWrapper>
    );
  }
}
