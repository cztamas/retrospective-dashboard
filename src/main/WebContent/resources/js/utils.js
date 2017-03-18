var Utils = {
		
	setCookie: function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	
	getCookie: function(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
    		var c = ca[i];
    		while (c.charAt(0) == ' ') {
        		c = c.substring(1);
    		}
    		if (c.indexOf(name) == 0) {
        		return c.substring(name.length, c.length);
    		}
		}
		return null;
	},
	
	copyToClipboard: function(text) {
	    if (window.clipboardData && window.clipboardData.setData) {
	        return clipboardData.setData("Text", text); 

	    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
	        var textarea = document.createElement("textarea");
	        textarea.textContent = text;
	        textarea.style.position = "fixed";
	        document.body.appendChild(textarea);
	        textarea.select();
	        try {
	            return document.execCommand("copy");
	        } catch (ex) {
	            console.warn("Copy to clipboard failed, falling back to prompt", ex);
	            window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
	            return false;
	        } finally {
	            document.body.removeChild(textarea);
	        }
	    }
	},
	
	openInNewTab: function(url) {
		var win = window.open(url, '_blank');
		win.focus();
	},
	
	htmlEncode: function(value) {
		return $('<div/>').text(value).html();
	},
	
	htmlDecode: function(value) {
		return $('<div/>').html(value).text();
	},
	
	isInt: function(value) {
		return !isNaN(value) && 
	         parseInt(Number(value)) == value && 
	         !isNaN(parseInt(value, 10));
	},
	
	isOverflowing: function(element) {
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
	},
	
	handleError: function(message, error) {
		
	}
};