package com.streamlined.util.collections;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Iterator;

public abstract class CollectionSelector
{
    public CollectionSelector() {}
    
    public Collection select(Collection aCollection) 
    {
        return this.select(aCollection, null);
    }
    
    public Collection select(Collection aCollection, Object keyValue)
    {
        Object current = null;
        Collection newCollection = null;
        Iterator it = aCollection.iterator();
        try
        {
            newCollection = (Collection)aCollection.getClass().newInstance();
        }
        catch (IllegalAccessException  ex)
        {
            newCollection =  new ArrayList();
        }
        catch (InstantiationException  ex)
        {
            newCollection =  new ArrayList();
        }
        while(it.hasNext())
        {
            current = it.next();
            if (this.selectBlock(current, keyValue)) 
                newCollection.add(current);
        }
        return newCollection;
    }
    public abstract boolean selectBlock(Object anObject, Object keyValue);
}
    
