import './index.css'

const RepositoryItem = props => {
  const {siteDetails} = props
  const updateSiteDetails = {
    avatarUrl: siteDetails.avatar_url,
    forksCount: siteDetails.forks_count,
    id: siteDetails.id,
    name: siteDetails.name,
    issuesCount: siteDetails.issues_count,
    starsCount: siteDetails.stars_count,
  }
  const {
    avatarUrl,
    forksCount,
    name,
    issuesCount,
    starsCount,
  } = updateSiteDetails
  return (
    <li className="item-card">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <p className="name">{name}</p>
      <div className="below">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="stars"
          alt="stars"
        />
        <p className="para">{starsCount} stars</p>
      </div>
      <div className="below">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="stars"
          alt="forks"
        />
        <p className="para">{forksCount} forks</p>
      </div>
      <div className="below">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="stars"
          alt="open issues"
        />
        <p className="para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
