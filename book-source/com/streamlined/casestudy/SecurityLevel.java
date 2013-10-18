package com.streamlined.casestudy;

import java.util.*;

public class SecurityLevel extends Object 
{
    private LevelType level;
    
    private static class LevelType 
    {
        private int code;
        private String name;
        
        LevelType(int newCode, String nameString)
        {
            this.code = newCode;
            this.name = nameString;
        }
        
        public int getCode( ) { return this.code; }
        public boolean equals(Object anObject) 
        { 
            if (anObject instanceof LevelType)
                return this.code == ((LevelType)anObject).getCode();
            else return false;
        }
        
        public int compareTo(Object anObject) 
        { 
            return this.compareTo((LevelType)anObject);
        }
        
        public int compareTo(LevelType other)
        {
            int myValue = this.code;
            int otherValue = other.code;
            return (myValue < otherValue ? -1 : (myValue == otherValue ? 0 : 1));
        }
        
        public String toString()
        {
            return this.name + " [level=" + this.code + "]";
        }
    }
    
    private static LevelType LOW = new LevelType(0, "low");
    private static LevelType MEDIUM = new LevelType(1, "medium");   
    private static LevelType HIGH = new LevelType(2, "high");  
    private static LevelType SECRET = new LevelType(3, "secret");     
    
    public SecurityLevel()
    {
        this.setLevelLow();
    }
    
    // ACCESSORS
    public void setLevelLow()
    {
        this.level = LOW;
    }
    
    public void setLevelMedium()
    {
        this.level = MEDIUM;
    }
    
    public void setLevelHigh()
    {
        this.level = HIGH;
    }
    
    public void setLevelSecret()
    {
        this.level = SECRET;
    }
     
    public void isLow()
    {
        this.level.equals(LOW);
    }
    
    public void isMedium()
    {
        this.level.equals(MEDIUM);
    }
    
    public void isHigh()
    {
        this.level.equals(HIGH);
    }
    
    public void isSecret()
    {
        this.level.equals(SECRET);
    }
    
    // EQUALS
    public boolean equals(Object anObject) 
    { 
        if (anObject instanceof SecurityLevel)
        {
            SecurityLevel otherST = (SecurityLevel)anObject;
            return this.level.equals(otherST.level);
        }
        else return false;
    }
 
    public boolean greaterThan(SecurityLevel aLevel) 
    { 
        return (this.compareTo(aLevel) > 0);
    }

    public int compareTo(Object anObject)
    {
        return this.compareTo((SecurityLevel)anObject);
    }
    
    public int compareTo(SecurityLevel other)
    {
        return this.level.compareTo(other.level);
    }
    
    public String toString()
    {
        return "Security Level: " + this.level;
    }
}