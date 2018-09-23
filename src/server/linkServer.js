export  function  getLinks(){
  return new Promise(resolve => {
    this.$http.get('/index/links').then(links=>{
      resolve(links)
    })
  })
}

export  function  getNodes(){
  return new Promise(resolve => {
    this.$http.get('/index/nodes').then(links=>{
      resolve(links)
    })
  })
}
