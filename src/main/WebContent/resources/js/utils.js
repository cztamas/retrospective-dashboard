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
	
	requestFullScreen: function() {
		var docElm = document.documentElement;
		if (docElm.requestFullscreen) {
		    docElm.requestFullscreen();
		}
		else if (docElm.mozRequestFullScreen) {
		    docElm.mozRequestFullScreen();
		}
		else if (docElm.webkitRequestFullScreen) {
		    docElm.webkitRequestFullScreen();
		}
		else if (docElm.msRequestFullscreen) {
		    docElm.msRequestFullscreen();
		}
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
	
	nl2br: function(str, is_xhtml) {   
	    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
	    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
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
		console.log(message);
		console.log(error);
	},
	
	getQueryParameter: function(name, url) {
	    if (!url) {
	      url = window.location.href;
	    }
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
};