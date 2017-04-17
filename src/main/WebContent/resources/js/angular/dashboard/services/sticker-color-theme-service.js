app.service('stickerColorThemeService', function StickerColorThemeService() {
	
	var self = this;
	
	self.getStickerBackgroundCssList = function() {
		
		// Gradients taken from http://www.colorzilla.com/gradient-editor/
		
		var themes = [  
            // default
            'background-image: -ms-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
			+ 'background-image: -moz-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
			+ 'background-image: -o-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
			+ 'background-image: -webkit-gradient(linear, left bottom, right top, color-stop(0, #FCCD4D), color-stop(50, #FBDF93), color-stop(100, #FCCD4D));'
			+ 'background-image: -webkit-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
			+ 'background-image: linear-gradient(to top right, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);',
			
			// yellow
			'background: #f9ee4d;'
			+ 'background: -moz-linear-gradient(45deg, #f9ee4d 0%, #f7f1a3 50%, #f9ee4d 100%);'
			+ 'background: -webkit-linear-gradient(45deg, #f9ee4d 0%,#f7f1a3 50%,#f9ee4d 100%);'
			+ 'background: linear-gradient(45deg, #f9ee4d 0%,#f7f1a3 50%,#f9ee4d 100%);'
			+ 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f9ee4d\', endColorstr=\'#f9ee4d\',GradientType=1 );',
			
			// green
			'background: #6ce045;'
			+ 'background: -moz-linear-gradient(45deg, #6ce045 0%, #8eff9f 50%, #6ce045 100%);'
			+ 'background: -webkit-linear-gradient(45deg, #6ce045 0%,#8eff9f 50%,#6ce045 100%);'
			+ 'background: linear-gradient(45deg, #6ce045 0%,#8eff9f 50%,#6ce045 100%);'
			+ 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#6ce045\', endColorstr=\'#6ce045\',GradientType=1 );',
			
			// blue
			'background: #97beeb;'
			+ 'background: -moz-linear-gradient(45deg,  #97beeb 0%, #aed2f0 50%, #97beeb 100%);'
			+ 'background: -webkit-linear-gradient(45deg,  #97beeb 0%,#aed2f0 50%,#97beeb 100%);'
			+ 'background: linear-gradient(45deg,  #97beeb 0%,#aed2f0 50%,#97beeb 100%);'
			+ 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#97beeb\', endColorstr=\'#97beeb\',GradientType=1 );',
			
			// red	
			'background: #ff7977;'
			+ 'background: -moz-linear-gradient(45deg,  #ff7977 0%, #ff959c 50%, #ff7977 100%);'
			+ 'background: -webkit-linear-gradient(45deg,  #ff7977 0%,#ff959c 50%,#ff7977 100%);'
			+ 'background: linear-gradient(45deg,  #ff7977 0%,#ff959c 50%,#ff7977 100%);'
			+ 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#ff7977\', endColorstr=\'#ff7977\',GradientType=1 );',
			
			// silver
			'background: #c3c3c3;'
			+ 'background: -moz-linear-gradient(45deg,  #c3c3c3 0%, #e2e2e2 51%, #c3c3c3 100%);'
			+ 'background: -webkit-linear-gradient(45deg,  #c3c3c3 0%,#e2e2e2 51%,#c3c3c3 100%);'
			+ 'background: linear-gradient(45deg,  #c3c3c3 0%,#e2e2e2 51%,#c3c3c3 100%);'
			+ 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#c3c3c3\', endColorstr=\'#c3c3c3\',GradientType=1 );'

			];
		
		return themes;
		
	};
});