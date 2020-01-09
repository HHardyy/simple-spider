const https=require('https')
const fs=require('fs')
const path=require('path')

https.get('https://www.bilibili.com/read/cv2847481?from=category_2',function(req,res){
	let html=''
	req.on('data',function(chunk){
		html+=chunk
	})

	req.on('end',function(){
		let reg=/src="(.*?\.jpg)"/img
		while(filename=reg.exec(html)){
			getImg(filename[1])
		}
	})
})

function getImg(url){
	let imgObj=path.parse(url)  //解析图片
	let imgname=imgObj.base   //文件名
	console.log(imgname);
	let stram=fs.createWriteStream('./files/'+imgname);    //创建一个管道，用于写入流
	if (imgObj.root.length==0) {   // 兼容网址里面没有根的时候
		url='/'+url
	}
	url='https:'+url
	https.get(url,function(res){
		res.pipe(stram)    //将请求的数据流直接流到管道里面，然后存到硬盘
	})
}