const {URL,URLSearchParams} = require('url')
function formatUrl(host,params) {
    if(params.f_search == ''){
        return `${host}?page=${params.page||0}`
    }else{
        return host+'?'+Object.entries(params).map((item,index)=>{
            return item.join('=')
        }).join('&')
    }

}
module.exports={
    formatUrl
}

