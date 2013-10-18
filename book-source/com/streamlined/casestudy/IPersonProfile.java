package com.streamlined.casestudy;

import java.util.*;

/** This interface should be implemented by any class
  * that has objects that assume a person profile. 
  * The person class implements this interface.
  * Other classes that implement this interface are
  * classes for role objects.
  * A role object should delegate these messages
  * back to its parent, the person object.
  */
public interface IPersonProfile
{    
    // ACCESSORS -- get properties
    public String getName();
    public String getTitle();
    public String getEmail();
        
    // DETERMINE MINE
    public boolean hasValidEmail();
} 