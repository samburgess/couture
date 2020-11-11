import axios from 'axios'


//comma==and, space==or
//do both?
var query = `patagonia`

//put data in our output format
const crunchData = async (data) => {

    //TODO**** needs outer loop for each item

    let ret = []

    //return data format:
    // title - str
    // images - array of image files
    // description - string
    // auction - boolean
    // price according to ^
    // shipping / location

    for (let i = 0; i < data.length; i++){
        
        //make auc/fix prices empty objects if not present, append all to object at end

        let el = []

        let images = []
        images.push(data[i].image.imageUrl)
        if (data[i].additionalImages){
            for (let j = 0; j<data[i].additionalImages.length; j++){
                images.push(data[i].additionalImages[j].imageUrl)
            }
        }
        el.push(data[i].title)
        el.push(images)
        if (data[i].buyingOptions.includes("FIXED_PRICE")){
            el.push(data[i].price.value)
        }else{
            el.push("")
        }
        if (data[i].buyingOptions.includes("AUCTION")){
            el.push({"aucPrice":data[i].currentBidPrice.value})
        }else{
            el.push("")
        }
        ret.push({
            title:el[0], images:el[1], fixPrice:el[2], aucPrice:el[3]
        })
        
    }
    console.log("****PARSED*****")
    console.log(ret)
    console.log("****///PARSED*****")
    return ret
}


const getResults = async () => {

    const rawKey = await fetch('http://localhost:3001')
    const key = await rawKey.text()

    const callApi = await axios({

        method: 'GET',
        url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?',
        params: {
            q: query,
            offset: 0,
            limit:10
        },
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            Authorization:'Bearer '+key,
            'X-EBAY-C-MARKETPLACE-ID' : 'EBAY_US'
        }

    }).catch(alert)

    //TODO** error handling - no way this is right lol

    console.log(callApi.data.itemSummaries)

    const parsed = await crunchData(callApi.data.itemSummaries)

    return parsed
}

export default getResults;