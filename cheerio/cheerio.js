let http=require('http')
let https=require('https')
https.get('https://mopecat.cn',function(req,res){
    let html=''
    req.on('data',function(chunk){
        html+=chunk
    })
    req.on('end',function(){
        getDom(html)
    })
})

function getDom(html){
     let cheerio=require('cheerio')
     let $=cheerio.load(html,{decodeEntities:false})
     $('a').each(function(index,item){
         console.log($(item).attr('href'))
     })
}
