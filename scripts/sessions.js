chrome.extension.sendRequest(
	{isYouDianGuanZhu: true, token: window.location.hash},
	function(response){
			// alert('success');
			window.close();
		}
);
