<template>
  <div class="spinner">
    <div class="double rect1"></div>
    <div class="double rect2"></div>
    <div class="double rect3"></div>
    <div class="double rect4"></div>
    <div class="double rect5"></div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style>
.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -30px;
    /* width: 50px; */
    height: 60px;
    text-align: center;
    font-size: 10px;
}
.spinner > .double {
    background: #264b83;/*49a9ee*/
    margin-left: 5px;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: stretchDelay 1.2s infinite ease-in-out;
    animation: stretchDelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {-webkit-animation-delay: -1.1s;animation-delay: -1.1s;}
.spinner .rect3 {-webkit-animation-delay: -1.0s;animation-delay: -1.0s;}
.spinner .rect4 {-webkit-animation-delay: -0.9s;animation-delay: -0.9s;}
.spinner .rect5 {-webkit-animation-delay: -0.8s;animation-delay: -0.8s;}
@-webkit-keyframes stretchDelay {0%, 40%, 100% {-webkit-transform: scaleY(0.4)}20% {-webkit-transform: scaleY(1.0)}}
@keyframes stretchDelay {0%, 40%, 100% {transform: scaleY(0.4);  -webkit-transform: scaleY(0.4);}20% {transform: scaleY(1.0);  -webkit-transform: scaleY(1.0);}}
</style>
