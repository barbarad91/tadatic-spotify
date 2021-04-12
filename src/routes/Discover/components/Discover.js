import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import axios from 'axios'

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    }

    this.baseUrl = 'https://api.spotify.com'
  }

  fetchNewReleases = async () =>
    await axios.get(`${this.baseUrl}/v1/browse/new-releases`, {
      headers: {
        Authorization:
          'Bearer BQAuSmuxPJTNaExpOjEg9pBVjGNhyLy3I4stzFJspXFa9EGM0-s7_ItuMZDCr0dheYDIH6PEpW7KFPPSJAKyh9i6Siqq-lxllmyZnx63Lpn9z1wfCPNG05O1PajVmrY9C93GpTRY7mefPGI',
        'Content-Type': 'application/json',
      },
    })

  componentDidMount = async () => {
    const newReleases = await this.fetchNewReleases()
    this.setState({ newReleases: newReleases.data.albums.items })
  }

  render() {
    const { newReleases, playlists, categories } = this.state

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    )
  }
}
