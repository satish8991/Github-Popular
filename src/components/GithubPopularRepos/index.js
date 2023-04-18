import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    selectedId: languageFiltersData[0].id,
    popularSitesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularSites()
  }

  updateSelectedId = id => {
    this.setState({selectedId: id}, this.getPopularSites)
  }

  onSuccess = () => {
    this.setState({apiStatus: apiStatusConstants.success})
  }

  onFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  getPopularSites = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {selectedId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        popularSitesList: data,
      })
      this.onSuccess()
    } else if (response.status === 401) {
      this.onFailure()
    }
  }

  renderPopularSitesList = () => {
    const {popularSitesList} = this.state
    return (
      <ul className="repository-item-list">
        {popularSitesList.popular_repos.map(each => (
          <RepositoryItem siteDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderInProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      className="failure-view-image"
      alt="failure view"
    />
  )

  renderFinalResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgress()
      case apiStatusConstants.success:
        return this.renderPopularSitesList()
      default:
        return null
    }
  }

  render() {
    const {selectedId} = this.state
    return (
      <div className="container">
        <h1 className="heading">Popular</h1>
        <ul className="language-filter-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              itemDetails={each}
              key={each.id}
              isSelected={selectedId === each.id}
              updateSelectedId={this.updateSelectedId}
            />
          ))}
        </ul>
        {this.renderFinalResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
