<div id="context-menu">
  <ul class="dropdown-menu" role="menu">
    <li>
    	<a 
    		tabindex="-1" 
    		href="#" 
    		onClick="if (confirm('Are you sure you want to remove this item?')) { app.getController('board-page').registerRemoved(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker); }">Remove
    	</a>
    </li>
    <li>
    	<div tabindex="-1" href="#" class="context-menu-separator">&nbsp;</div>
    </li>
    <li>
    	<a tabindex="-1" href="#" onClick="app.getController('board-page').registerColorChange(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker, 0)">
    		<span id="color-sample-0" class="color-theme-sample"><img src="../../resources/images/spacer.gif" height="16" width="16" /></span> Default
    	</a>
    </li>
    <li>
    	<a tabindex="-1" href="#" onClick="app.getController('board-page').registerColorChange(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker, 1)">
    		<span id="color-sample-1" class="color-theme-sample"><img src="../../resources/images/spacer.gif" height="16" width="16" /></span> Yellow
    	</a>
    </li>
    <li>
    	<a tabindex="-1" href="#" onClick="app.getController('board-page').registerColorChange(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker, 2)">
    		<span id="color-sample-2" class="color-theme-sample"><img src="../../resources/images/spacer.gif" height="16" width="16" /></span> Green
    	</a>
    </li>
    <li>
    	<a tabindex="-1" href="#" onClick="app.getController('board-page').registerColorChange(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker, 3)">
    		<span id="color-sample-3" class="color-theme-sample"><img src="../../resources/images/spacer.gif" height="16" width="16" /></span> Blue
    	</a>
    </li>
    <li>	
    	<a tabindex="-1" href="#" onClick="app.getController('board-page').registerColorChange(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker, 4)">
    		<span id="color-sample-4" class="color-theme-sample"><img src="../../resources/images/spacer.gif" height="16" width="16" /></span> Red
    	</a>
    </li>
    <li>	
    	<a tabindex="-1" href="#" onClick="app.getController('board-page').registerColorChange(Context.lastRightClickOnStickerControlId, Context.lastRightClickOnSticker, 5)">
    		<span id="color-sample-5" class="color-theme-sample"><img src="../../resources/images/spacer.gif" height="16" width="16" /></span> Silver
    	</a>
    </li>
  </ul>
</div>