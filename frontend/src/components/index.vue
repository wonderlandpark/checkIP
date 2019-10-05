/* eslint-disable */
<template> 
<div class="movies"> 
    <h1>내 아이피</h1> 
    <p>{{info.data.ip}}</p>
       </div>

       </template>

    
<script>
export default {
created(){ 
var id = this.$route.params.id; 
this.$http.get(`/json`).then(response => { this.info = response; console.log(response)}); },
data(){
    return {
        info : {}
    }
},

   
}
</script>

