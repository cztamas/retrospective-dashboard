package com.retrospective.model.enums;

public enum BoardType {

	Plot(1), Vertical(2);
	
	private final int dbId;
	
	BoardType(int dbId) { 
		this.dbId = dbId; 
	}
	
    public int getValue() { 
    	return dbId; 
    }
}
