import './styles.css'

export const Search = ({searchValue, handleChange})=> (
  <>
    {!!searchValue &&(
      <h2>Search Value: {searchValue}</h2>
    )}
    <input 
      type='search' 
      onChange= {handleChange}
      value= {searchValue} 
      className='text-input'
      placeholder='Type your search'
    /> 
  </>
)

