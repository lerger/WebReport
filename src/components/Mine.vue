<template>
	<div class="mineContainer">我的</div>
</template>

<script type="text/javascript">
import $ from 'jquery'
export default {
	ready() {
		//导航标题名
		$(".cctitle").text('我的');
		console.log('我的');
	}
}

</script>
