package com.retrospective.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

public class ActiveSessionList extends ArrayList<String> {

	private static final long serialVersionUID = 1L;
	private Hashtable<String, Date> timestamps;
	
	public ActiveSessionList() {
		timestamps = new Hashtable<>();
	}
	
	@Override
	public boolean add(String item) {
		
		if (this.contains(item)) {
			this.timestamps.put(item, Calendar.getInstance().getTime());
		}
		else {
			super.add(item);
			this.timestamps.put(item, Calendar.getInstance().getTime());
		}
		
		this.purgeAll();
		
		return true;
	}
	
	public void purgeAll() {
		
		List<String> removals = new ArrayList<>();
		for (String token : this) {
			if (this.timestamps.get(token).before(addMinutesToDate(-5, Calendar.getInstance().getTime()))) {
				this.timestamps.remove(token);
				removals.add(token);
			}
		}
		
		this.removeAll(removals);
	}
	
	private static Date addMinutesToDate(int minutes, Date beforeTime){
	    final long ONE_MINUTE_IN_MILLIS = 60000;

	    long curTimeInMs = beforeTime.getTime();
	    Date afterAddingMins = new Date(curTimeInMs + (minutes * ONE_MINUTE_IN_MILLIS));
	    return afterAddingMins;
	}
}
