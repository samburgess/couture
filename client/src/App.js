import React from 'react';
import './App.css';
import getResults from './sites/ebay.js'
import ScrollItem from './components/ScrollItem.js'


class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      ebayData:"",
      gotEbay:false
    }
  }

  async componentDidMount(){

    const rawData = await getResults()

    const strData = await JSON.stringify(rawData)

    const res = await JSON.parse(strData)

    this.setState({ebayData:res, gotEbay:true})

    console.log("end didmount")
  }
  
  
  render(){

    if (this.state.gotEbay === true){

      console.log("data:   ",this.state.ebayData)

      const scrollItems = this.state.ebayData.map( (el) =>
        <ScrollItem
          images={el.images}
          title={el.title}
          price={el.aucPrice.value}
        />
      )

      return (
        <div className="ScrollWrap">
          <header > {/* TODO***put this into infinite scroll */}
            <ul>{scrollItems}</ul>
          </header>
        </div>
      );
    }else{
    return(<div>Loading ebay results . . . . . . . </div>)

    }
  
  }

}

export default App;