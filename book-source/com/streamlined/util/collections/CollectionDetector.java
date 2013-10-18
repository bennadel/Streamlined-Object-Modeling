package com.streamlined.util.collections;

import java.util.Collection;
import java.util.Iterator;

public abstract class CollectionDetector
{
   public CollectionDetector() {}
    
    public Object detect(Collection aCollection) 
    {
        return this.detect(aCollection, null);
    }
    
    public Object detect(Collection aCollection, Object keyValue)
    {
        Iterator it = aCollection.iterator();
        Object current = null;
        while(it.hasNext())
        {
            current = it.next();
            if (this.detectBlock(current, keyValue)) 
                return current;
        }
        return null;
    }
    
    public abstract boolean detectBlock(Object anObject, Object keyValue);
}
