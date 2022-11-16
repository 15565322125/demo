;(function(){
    Flip.prototype.First = function(el){
        return el.getBoundingClientRect()
    }
    Flip.prototype.Last = function(el){
        return el.getBoundingClientRect()
    }
    Flip.prototype.Invert = function(el){
        var first = el.first, last = el.last
        if(first){
            el.style.transform = `translateX(${first.x - last.x}px) translateY(${first.y - last.y}px) scaleX(${first.width / last.width}) scaleY(${first.height / last.height})`
        }else{
            el.style.transform = `translateX(${-last.x}px) translateY(${-last.y}px) scaleX(${0}) scaleY(${0})`
        }
        el.first = last
    }
    Flip.prototype.Play = function(){
        for(let i = 0; i < this.list.length; i ++){
            this.list[i].style.transition = ''
            this.list[i].last = this.Last(this.list[i])
            this.Invert(this.list[i])
            setTimeout(() => {
                this.list[i].style.transition = 'all .4s ease'
                this.list[i].style.transform = ''
            }, 0)
        }
    }
    
    function Flip(list){
        this.list = list
        for(var i = 0; i < this.list.length; i ++){
            this.list[i].first = this.First(this.list[i])
        }
    }

    window.Flip = Flip
})()