

function emit()
{
    this.map=new Map()
    this.on=function(name1,fn)
    {
       if(this.map.has(name1))
       {
          this.map.get(name1).push(fn)
       }else{
          this.map.set(name1,[fn])
       }
    }
    this.off=function(name1,fn)
    {
      if(this.map.has(fn))
      {
          let index=this.map.get(name1).indexOf(fn)
          this.map.get(name1).splice(index,1)
      }
    }
    this.work=function(name1,...args)
    {
      if(this.map.has(name1))
      {
        this.map.get(name1).forEach(fn => {
            fn(...args)
        });
      }
    }
    this.once=function(name1,...args)
    {
      if(this.map.has(name1))
      {
        this.map.get(name1).forEach(fn=>{
          fn(...args)
        })
        this.map.set(name1,[])
      }
    }
}
const e=new emit()
const fn1=function(a,b)
{
  console.log(a,b)
}
const fn2=function(a,b)
{
  console.log(a+b)
}
e.on('one',fn1)
e.on('one',fn2)
e.once('one',1,2)
e.once('one',1,2)
