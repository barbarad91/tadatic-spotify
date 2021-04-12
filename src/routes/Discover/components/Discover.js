import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import axios from 'axios'
import apiInfo from '../../../config'

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    }
  }

  fetchNewReleases = async () =>
    await axios.get(`${apiInfo.api.baseUrl}/browse/new-releases`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    })

  fetchFeaturedPlaylists = async () =>
    await axios.get(`${apiInfo.api.baseUrl}/browse/featured-playlists`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    })

  fetchCategories = async () =>
    await axios.get(`${apiInfo.api.baseUrl}/browse/categories`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    })

  componentDidMount = async () => {
    const newReleases = await this.fetchNewReleases()
    const featuredPlaylists = await this.fetchFeaturedPlaylists()
    const categories = await this.fetchCategories()
    this.setState({
      newReleases: newReleases.data.albums.items,
      playlists: featuredPlaylists.data.playlists.items,
      categories: categories.data.categories.items,
    })
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
