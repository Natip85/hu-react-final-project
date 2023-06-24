interface Props  {
  mainText: string
  subText?: string
}

const Title = ({ mainText, subText }: Props) => {
  return (
    <h2 style={{textAlign: 'center', marginTop: 20, fontSize:'3rem'}}>
      { mainText }<br/>
      {subText &&
      <small className='text-muted'>
        {subText}
        </small>
      }
      
      </h2>
  )
}

export default Title