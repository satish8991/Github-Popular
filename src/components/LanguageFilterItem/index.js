import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, isSelected, updateSelectedId} = props
  const {id, language} = itemDetails
  const buttonClass = isSelected ? 'selected-button' : 'button'
  const buttonClicked = () => {
    updateSelectedId(id)
  }
  return (
    <li className="filter-list">
      <button type="button" className={buttonClass} onClick={buttonClicked}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
