function book(title, length, readStatus){
    this.title = title;
    this.length = length;
    this.readStatus = readStatus;
    this.info = function(){
        return (this.title + ', ' + this.length + ', ' + this.readStatus + '.');
    }
} 